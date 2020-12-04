
import * as React from 'react'
import { Button } from '../../style/button'
import { H1 } from '../../style/header'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { getLoginPath } from '../nav/route'

export function CreateAccount() {

  function redirect() {
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => window.location.replace(getLoginPath()))
  }

  return (

    <div style={{ flexWrap: "nowrap" }}>

      <OuterFrame>
        <H1>Create an Account</H1>
        <br></br>
        <tbody>
          <tr >
            <td> ID </td>
            <td>
              <Input type="text" placeholder="end by @g.ucla.edu"></Input>
            </td>
          </tr>
          <tr>
            <td> PW </td>
            <td >
              <Input type="text" placeholder="at least 6 characters"></Input>
            </td>
          </tr>
        </tbody>
        <br></br><br></br>
        <tr>
          <td> <Button onClick={redirect}>SUBMIT</Button> </td>
          <td> <Button onClick={redirect}>CANCEL</Button> </td>
        </tr>


      </OuterFrame>

    </div>
  )
}



const OuterFrame = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderColor: '#8491ad',
  borderLeftWidth: '20px',
  borderRightWidth: '20px',
  height: '300px',
  width: '400px',
})
