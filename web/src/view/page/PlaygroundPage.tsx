import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Login } from '../auth/Login'
import { AppRouteParams, PlaygroundApp } from '../nav/route'
// recently added opbject
import { Demo } from '../playground/demo'
import { Surveys } from '../playground/Surveys'
import { Page } from './Page'


interface PlaygroundPageProps extends RouteComponentProps, AppRouteParams { }

export function PlaygroundPage(props: PlaygroundPageProps) {
  return <Page>{getPlaygroundApp(props.app)}</Page>
}

function getPlaygroundApp(app?: PlaygroundApp) {
  if (!app) {
    return <div>choose an app</div>
  }
  switch (app) {
    case PlaygroundApp.SURVEYS:
      return <Surveys />
    case PlaygroundApp.LOGIN:
      return <Login />

    // recently added opbject
    case PlaygroundApp.DEMO:
      return <Demo />
    default:
      throw new Error('no app found')
  }
}
