/* eslint-disable prettier/prettier */
import * as React from 'react'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { Page } from '../page/Page'

export function Demo() {
  return (
    <Page>
      <ST>
        <H1>CS 188 - public chatting room</H1>
        <H2>Please do not use improper language</H2>
        <label></label>
        <S><th id="textView" align="left"></th></S>
        <tr>
          <td width="90%">
            <Input type="text" id="input_text" placeholder="Say Hello to all" onKeyPress={enter_recognition}></Input>
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
function temp() {
  const text = document.getElementById('textView')
  const add = document.createElement('tr')
  const input = (document.getElementById('input_text') as HTMLInputElement).value


  add.textContent = 'Line ' + line_num + ': ' + input + '\n'
  line_num = line_num + 1
  text?.appendChild(add)

}

function enter_recognition() {
  document.getElementById('input_text')?.addEventListener("keyup", function (event) {
    console.log(event.key)
    var code = event.keyCode
    if (code === 13) {
      event.preventDefault()
      document.getElementById("insert_text")?.click()
    }
    // if (event.key === 13) {
    //   event.preventDefault()
    //   document.getElementById("insert_text")?.click()
    // }
  })
}



const ST = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
})

const S = style('div', {
  height: '300px',
  width: '600px',
  overflowWrap: 'anywhere',
  overflowY: 'auto',
})
