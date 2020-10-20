import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { ColorName, Colors } from '../../../../common/src/colors'
import { H1, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { IntroText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface DemoPageProps extends RouteComponentProps, AppRouteParams {}

export function Demo(props: DemoPageProps){
  return  <Page>
            <Section>
              <H1>CS 188</H1>
              <H3>Scalable Internet Services</H3>
              <H3>UCLA, Fall 2020</H3>
              <Spacer $h4 />
              <div> hi  </div>
              <IntroText>Lecture slides and code will be posted regularly. Schedule subject to change.</IntroText>
            </Section>
          </Page>
}

const Section = style('div', 'mb4 mid-gray ba b--mid-gray br2 pa3', (p: { $color?: ColorName }) => ({
  borderLeftColor: Colors[p.$color || "ink"] + '!important',
  borderLeftWidth: '10px',
  borderRightColor: Colors[p.$color || "ink"] + '!important',
  borderRightWidth: '10px',
}))

/*import { useQuery, useSubscription } from '@apollo/client'
import { useLocation } from '@reach/router'
import * as React from 'react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { strutil } from '../../../../common/src/util'
import { getApolloClient } from '../../graphql/apolloClient'

*/

