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
        <H2>Please do not use imporoper language</H2>
        <label></label>
        <div id='textView' overflow-y='scroll'></div>
        <tr>
          <td width='90%'><Input type="text" id='input_text' placeholder='Say Hello to all'></Input></td>
          <td width='10%'><Button type='submit' id='insert_text' onClick={temp}> Enter </Button></td>
        </tr>


      </ST>
    </Page>

  )
}


var line_num = 0
function temp() {
  const text = document.getElementById('textView')
  const tex1 = document.getElementById('textView')?.innerHTML

  const add = document.createElement('tr')
  var blabla = document.getElementById('input_text')
  console.log(tex1)
  // console.log(blabla?.attributes, blabla?.attributes.length, blabla?.innerText)
  add.textContent = "Line " + line_num + " :  TEST  " + blabla?.attributes[0].name + " " + blabla?.attributes[0].value
  line_num = line_num + 1
  text?.appendChild(add)
}


const ST = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
})

