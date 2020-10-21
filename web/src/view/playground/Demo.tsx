import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button } from '../../style/button'
import { H1, H2 } from '../../style/header'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface DemoPageProps extends RouteComponentProps, AppRouteParams {}

export function Demo(props: DemoPageProps){
  return ( <Page>
    <ST>
      <H1>CS 188 - public chatting room</H1>
      <H2>Please do not use improper language</H2>
      <label></label>
      <S><th id="textView" align="left"></th></S>
      <tr>
        <td width="90%">
          <Input type="text" id="input_text" placeholder="Say Hello to all"></Input>
        </td>
        <td width="10%">
          <Button type="submit" id="insert_text" onClick={temp}>
            {' '}
            Enter{' '}
          </Button>
        </td>
      </tr>
    </ST>
  </Page>)

}

//const Content = style('div', 'flex-l w-400-l mr100-l')

const S = style('div',{
  margin: 'auto',
  height: '300px',
  width: '500px',
  overflowWrap: 'anywhere',
  overflow: 'auto',
})

let line_num = 0
function temp() {
  const text = document.getElementById('textView')
  const add = document.createElement('tr')
  const input = (document.getElementById('input_text') as HTMLInputElement).value

  add.textContent = 'Line ' + line_num + ': ' + input
  line_num = line_num + 1
  text?.appendChild(add)
}

const ST = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  width:'600px',
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
})