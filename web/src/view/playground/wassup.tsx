import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { H1, H3 } from '../../style/header'
import { style } from '../../style/styled'
import { Page } from '../page/Page'

export function Wassup() {
  return (
    <Page>
      <Hero>
        <H1>Welcome to our public chat room!</H1>
        <H3>Scalable Internet Services</H3>
        <H3>UCLA, Fall 2020</H3>
      </Hero>
    </Page>
  )
}

const Hero = style('div', 'mb4 w-100 ba b--mid-gray br2 pa3 tc', {
  borderLeftColor: Colors.lemon + '!important',
  borderRightColor: Colors.lemon + '!important',
  borderLeftWidth: '4px',
  borderRightWidth: '4px',
})
