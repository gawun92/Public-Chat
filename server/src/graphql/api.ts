/* eslint-disable prettier/prettier */
import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { BadWordPattern } from '../entities/BadWordPattern'
import { Chat } from '../entities/Chat'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    chat: async () => {
      const chathistory = await Chat.find()
      return chathistory
    },
    badwordpattern: async () => {
      const badword = await BadWordPattern.find()
      return badword
    }
  },
  Mutation: {
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
      const addNewRow = new Chat()
      addNewRow.name = name
      addNewRow.text = text
      await addNewRow.save()
      ctx.pubsub.publish('CHAT_UPDATE_' + addNewRow.name, addNewRow.text)
      return true
    },
    findBadWord: async (_, { chatStr }, ctx) => {
      const total = await (BadWordPattern.find())
      for (var i = 0; i < total.length; i++) {
        if (chatStr.includes(total[i].pattern))
          return true
      }
      return false
    }
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
    chatUpdates: {
      subscribe: (_, arg, ctx) => ctx.pubsub.asyncIterator('CHAT_UPDATE'),
      resolve: (payload: any) => payload,
    },
  },
}
