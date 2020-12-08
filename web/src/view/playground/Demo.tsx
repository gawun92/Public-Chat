/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
import { useQuery, useSubscription } from '@apollo/client'
import * as React from 'react'
import { useContext, useState } from 'react'
import { ChatSubscription, FetchChat, FetchImages, FetchUser } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { handleError } from '../toast/error'
import { toast } from '../toast/toast'
import { fetchChat, subscribeChat } from './fetchChat'
import { fetchImages } from './fetchImages'
import { fetchUser } from './fetchUser'
import { getBadWordPattern } from './mutateBadWordPattern'
import { UpdateChatHistory } from './mutateChat'
import { IndiChat } from './mutateTest'
import { UpdateUserBadWordCount } from './mutateUser'


export function Demo() {
  const { user } = useContext(UserContext)

  const { loading, data } = useQuery<FetchChat>(fetchChat)
  const sub = useSubscription<ChatSubscription>(subscribeChat)
  const initchatlength = data?.chat?.length
  const [status, setStatus] = useState(false)

  if (loading) {
    return <div>loading...</div>
  }

  if (!data || data.chat.length === 0) {
    return <div>no chats</div>
  }

  function getimages() {
    const { data } = useQuery<FetchImages>(fetchImages)
    return data
  }

  const imagedata = getimages()
  if (!imagedata || imagedata.images.length === 0) {
    return <div>no images</div>
  }
  const IM = imagedata.images
  const emojis = (<ol>
    {IM.map(image => (
      <EmojiButton onClick={() => printemoji(image.data)} key={Math.random()}>{image.data}</EmojiButton>
    ))}
  </ol>)

function loadchat(name: string)
{
  IndiChat(name).then(function (resp) {
    if (resp.data.IndiChat.length == 0)
    {
      window.alert("This user hasn't typed anything")

    }
    else{
      window.alert(resp.data.IndiChat)
    }

  })
}


function getusers() {
  const { data } = useQuery<FetchUser>(fetchUser)
  return data
}
const allusers = getusers()
  if (!allusers || allusers.user.length === 0) {
    return <div>no users</div>
  }

  const users = allusers.user
  const items = (<ol>
    {users.map(user => (
      <EmojiButton onClick={() => loadchat(user.name)} key={Math.random()}>{user.name}</EmojiButton>
    ))}
  </ol>)

  function doUpdateUserBadWordCount(username: string, save_BW: string) {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    UpdateUserBadWordCount(username, save_BW).then(function (resp) {
      console.log("AM I here?")
      if (resp.data.updateUserBadWordCount != 'NA') {
        window.alert(resp.data.updateUserBadWordCount) // reason of why you are removed by popping up
        toast("You are removed!!!!!!!!")
      }


    })
  }

  function badWordDetection(chatStr: string) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBadWordPattern(chatStr).then(function (resp) {
      console.log("TEST : ", resp.data.findBadWord)
      if (resp.data.findBadWord != "NA") {
        toast("You cannot use bad word!!!!!!!!")
        console.log("You cannot use bad word!!!!!!!!")
        doUpdateUserBadWordCount(user === null ? "" : user.name, resp.data.findBadWord)
        //user.num_improper = user.num_improper + 1
      }
    })
  }


  function enter(target: any) {
    if (target.charCode === 13) {
      document.getElementById("insert_text")?.click()
    }
  }

  function printemoji(emoji: string) {
    //  const chats = document.getElementById('textView')
    //  const newchat = document.createElement('tr')
    doUpdateChatHistory(user === null ? "" : user.name, emoji)
    // newchat.textContent = (user === null ? "" : user.name) + ': ' + emoji + '\n'
    // chats?.appendChild(newchat)
  }


  React.useEffect(() => {
    if (!status) {
      setStatus(true)
      for (let i = 0; i < initchatlength!; i++) {
        const chats = document.getElementById('textView')
        const newchat = document.createElement('tr')
        newchat.textContent = data?.chat[i].name + ': ' + data?.chat[i].text + '\n'
        chats?.appendChild(newchat)
      }
    }
  });

  React.useEffect(() => {
    if (sub.data?.chatUpdates) {
      toast('Message from ' + sub.data?.chatUpdates.name + ' has been sent! ouo')
      const chats = document.getElementById('textView')
      const newchat = document.createElement('tr')
      newchat.textContent = sub.data?.chatUpdates.name + ': ' + sub.data?.chatUpdates.text + '\n'
      chats?.appendChild(newchat)
      //      console.log(chats)
      //      console.log(data?.chat)
      //      console.log(sub.data?.chatUpdates?.name)
      //      console.log(sub.data?.chatUpdates?.text)
    }
  }, [sub.data])


  function doUpdateChatHistory(name: string, text: string) {
    UpdateChatHistory(name, text).catch(handleError)
  }

  function temp() {
    //    const chats = document.getElementById('textView')
    //    const newchat = document.createElement('tr')
    const input = (document.getElementById('input_text') as HTMLInputElement)
    // helper()
    //times =1
    badWordDetection(input.value)

    doUpdateChatHistory(user === null ? "" : user.name, input.value)
    //    newchat.textContent = (user === null ? "" : user.name) + ': ' + input.value + '\n'
    input.value = input.defaultValue
    //    chats?.appendChild(newchat)
  }

  return (

    <div style={{ flexWrap: "nowrap" }}>

      <OuterFrame>
        <H1>CS 188 - public chatting room</H1>
        <H2>Please do not use improper language</H2>

        <label></label>
        <InnerFrame><th id="textView" align="left"></th></InnerFrame>
        <label>Send an emoji!</label>
        <ButtonFrame>
          <div className="btn-toolbar">
            {emojis}
          </div>
        </ButtonFrame>
        <tr>
          <td width="90%">
            <Input type="text" id="input_text" placeholder="Say hello to all" onKeyPress={enter}></Input>
          </td>
          <td width="10%">
            <Button type="submit" id="insert_text" onClick={temp} >
              {' '}
              Enter{' '}
            </Button>
          </td>

        </tr>

        <br></br>
        <br></br>
        <H2>Check out the Chat History of individual users:</H2>
        <HistoryFrame>
        {items}
        </HistoryFrame>


      </OuterFrame>

    </div>
  )
}


const OuterFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderColor: '#8491ad',
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
  height: '800px',
  width: '1000px',
})

const InnerFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderColor: '#8491ad',
  borderTopWidth: '20px',
  borderBottomWidth: '20px',
  height: '300px',
  width: '930px',
  overflowWrap: 'anywhere',
  overflowY: 'auto',

  //only 'bad' thing about this is the messages come out from the bottom first
  display: 'flex',
  flexDirection: 'column-reverse',

})

const HistoryFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderColor: '#8491ad',
  borderTopWidth: '20px',
  borderBottomWidth: '20px',
  height: '100px',
  width: '930px',
  overflowWrap: 'anywhere',
  overflowY: 'auto',

  //only 'bad' thing about this is the messages come out from the bottom first
  display: 'flex',
  flexDirection: 'column-reverse',

})

const ButtonFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {

  height: '50px',
  width: '930px',
  display: 'flex',
  flexDirection: 'column',

  overflowWrap: 'anywhere',
  overflowY: 'auto',
})


const EmojiButton = style('div', 'hover-bg-black-10', {
  backgroundColor: '#b3e3e2',
  borderRadius: '12px',
  color: 'black',
  fontSize: '14px',
  width: '120px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  margin: '5px',
  display: 'inline-block',
  cssFloat: 'left',
})
