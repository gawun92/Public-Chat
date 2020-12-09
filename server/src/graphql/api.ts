/* eslint-disable prettier/prettier */
import DataLoader from 'dataloader'
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { BadWordPattern } from '../entities/BadWordPattern'
import { Chat } from '../entities/Chat'
import { Images } from '../entities/Images'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()
const CHAT_UPDATE = 'CHAT_UPDATE'

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
  chatLoader: DataLoader<number, Chat>
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    chat: async () => {
      const chats = await Chat.find()
      return chats
    },
    badwordpattern: async () => {
      const badword = await BadWordPattern.find()
      return badword
    },
    images: async () => {
      const cuteimages = await Images.find()
      return cuteimages
    },
    user: async () => {
      const users = await User.find()
      return users
    },
  },
  Mutation: {
    IndiChat: async (_, { name }, ctx) => {
      const user = check(await User.findOne({ where: { name: name }, relations: ['chatCollec'] }))

      let result = ""
      let i = 0
      for (; i < user.chatCollec.length!; i++)
      {
          result += "[" + (user.chatCollec[i].name + "] : " + user.chatCollec[i].text + "\n")
      }
      if (user.chatCollec.length > 0)
        result += user.chatCollec[0].name + " has used " + user.num_improper + " bad words. If she/he uses " + (6 - user.num_improper) + " more bad words, she/he will be banned!"
      return result
    },
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer

      // saves a row to the database
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    updateChatHistory: async (_, { name, text }, ctx) => {
      const newChat = new Chat()
      const findUser = check(await User.findOne({ where: { name: name } }))

      if (findUser.online_status) {

        newChat.name = name
        newChat.text = text
        await newChat.save()

        ctx.pubsub.publish(CHAT_UPDATE, newChat)

        const findUser1 = check(await User.findOne({ where: { name: name }, relations: ['chatCollec'] }))
        findUser1.chatCollec.push(newChat)
        await findUser1.save()
        console.log(findUser1.chatCollec)
        return true
      }
      return false
    },
    findBadWord: async (_, { chatStr }, ctx) => {
      const total = await (BadWordPattern.find())
      let save_BW = "NA"
      for (let i = 0; i < total.length; i++) {
        const temp = chatStr.toLowerCase()
        if (temp.includes(total[i].pattern)) {
          save_BW = total[i].pattern
          return save_BW
        }
      }
      return "NA"
    },
    // needs to count up. Because the duplicate rows are not pushed and considered as one element
    updateUserBadWordCount: async (_, { username, save_BW }, ctx) => {

      const findUser = check(await User.findOne({ where: { name: username }, relations: ['usedBadWords'] }))
      const badWordObject = check(await BadWordPattern.findOne({ where: { pattern: save_BW } }))
      findUser.num_improper = findUser.num_improper + 1

      findUser.usedBadWords.push(badWordObject)
      await findUser.save()

      if (findUser.num_improper > 5) {
        findUser.online_status = false
        await findUser.save()
        let ret_str = "You are banned because you used : "
        for (let i = 0; i < findUser.usedBadWords.length; i++) {
          ret_str = ret_str + findUser.usedBadWords[i].pattern.toString() + "(" + findUser.usedBadWords[i].name.toString() + ") "
        }
        return ret_str
      }
      console.log(findUser.usedBadWords)

      return 'NA'
    }
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
    chatUpdates: {
      subscribe: (_, arg, ctx) => ctx.pubsub.asyncIterator(CHAT_UPDATE),
      resolve: (payload: any) => payload,
    },
  },
}
