/* eslint-disable prettier/prettier */
import { useQuery } from '@apollo/client'
import * as React from 'react'
import { useContext } from 'react'
import {
  FetchChat
} from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { Page } from '../page/Page'
import { handleError } from '../toast/error'
import { fetchChat } from './fetchChat'
import { UpdateChatHistory } from './mutateChat'

export function Demo() {
  const { user } = useContext(UserContext)
  const { loading, data } = useQuery<FetchChat>(fetchChat)
  let init = false
  const length = data?.chat?.length


  if (loading) {
    return <div>loading...</div>
  }

  function initialchat(i: number) {
    const test = document.getElementById('textView')
    const add = document.createElement('tr')
    add.textContent = data?.chat[i].name + ': ' + data?.chat[i].text + '\n'
    test?.appendChild(add)
  }

  function doUpdateChatHistory(name: string, text: string) {
    UpdateChatHistory(name, text).catch(handleError)
  }

  function helper() {
    const input = (document.getElementById('input_text') as HTMLInputElement).value
    void fetch('/playground/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })
  }

  function enter(target: any) {
    if (target.charCode === 13) {
      document.getElementById("insert_text")?.click()
    }
  }

  function temp() {
    if (init == false){
      for (let i = 0; i < (length === undefined? 0: length); i++) {
        initialchat(i)
      }
      init = true
    }

    const text = document.getElementById('textView')

    //  const isScrolledToBottom = text!.scrollHeight - text!.clientHeight <= text!.scrollTop + 1

    const add = document.createElement('tr')
    const input = (document.getElementById('input_text') as HTMLInputElement)

    helper()

    doUpdateChatHistory(user === null? "": user.name, input.value)
    add.textContent = (user === null? "": user.name) + ': ' + input.value + '\n'
    input.value = input.defaultValue
    line_num = line_num + 1
    text?.appendChild(add)

    // if (isScrolledToBottom) {
    //   text!.scrollTop = text!.scrollHeight - text!.clientHeight
    // }

  }

  return (
    <Page>
      <OuterFrame>
        <H1>CS 188 - public chatting room</H1>
        <H2>Please do not use improper language</H2>
        <label></label>
        <InnerFrame><th id="textView" align="left"></th></InnerFrame>
        <tr>
          <td width="90%">
            <Input type="text" id="input_text" placeholder="Say Hello to all" onKeyPress={enter}></Input>
          </td>
          <td width="10%">
            <Button type="submit" id="insert_text" onClick={temp} >
              {' '}
              Enter{' '}
            </Button>
          </td>
        </tr>
      </OuterFrame>
    </Page>
  )
}

let line_num = 0

const OuterFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
})

const InnerFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderTopWidth: '20px',
  borderBottomWidth: '20px',
  height: '400px',
  width: '600px',
  overflowWrap: 'anywhere',
  overflowY: 'auto',

  //only 'bad' thing about this is the messages come out from the bottom first
  display: 'flex',
  flexDirection: 'column-reverse',

})


