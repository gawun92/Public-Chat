/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'
import * as React from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { UpdateChatHistory, UpdateChatHistoryVariables } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { Page } from '../page/Page'
import { handleError } from '../toast/error'


export function UpdateChat(name: string, text: string) {
  const updateChatHistoryMutation = gql`
  mutation UpdateChatHistory($name: string!, $text: string!) {
    UpdateChatHistory(name: $name, text: $text)
  }
  `
  return getApolloClient().mutate<UpdateChatHistory, UpdateChatHistoryVariables>({
    mutation: updateChatHistoryMutation,
    variables: { name, text }
  })
}

export function Demo() {
  function helper() {
    const input = (document.getElementById('input_text') as HTMLInputElement).value
    fetch('/playground/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })
  }
  function demo(target: any) {
    if (target.charCode === 13) {
      document.getElementById("insert_text")?.click()
    }
  }
  function temp() {
    const text = document.getElementById('textView')
    const add = document.createElement('tr')
    const input = (document.getElementById('input_text') as HTMLInputElement)
    helper()
    UpdateChat("TEST", input.value).catch(handleError)
    add.textContent = 'Line ' + line_num + ': ' + input.value + '\n'
    input.value = input.defaultValue
    line_num = line_num + 1
    text?.appendChild(add)
  }
  return (
    <Page>
      <ST>
        <H1>CS 188 - public chatting room</H1>
        <H2>Please do not use improper language</H2>
        <label></label>
        <S><th id="textView" align="left"></th></S>
        <tr>
          <td width="90%">
            <Input type="text" id="input_text" placeholder="Say Hello to all" onKeyPress={demo}></Input>
          </td>
          <td width="10%">
            <Button type="submit" id="insert_text" onClick={temp}>
              {' '}
              Enter{' '}
            </Button>
          </td>
        </tr>
      </ST>
    </Page>
  )
}

let line_num = 0


const ST = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
})

// function enter_recognition(target: any) {
//   if (target.charCode === 13) {
//     document.getElementById("insert_text")?.click()
//   }
// }

const S = style('div', {
  height: '300px',
  width: '600px',
  overflowWrap: 'anywhere',
  overflowY: 'auto',

})
