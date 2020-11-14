/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'

export const fragmentChat = gql`
  fragment Chat on Chat {
    name
    text
  }
`

export const fetchChat = gql`
  query FetchChat {
    chat {
      ...Chat
    }
  }
  ${fragmentChat}
`
export const subscribeChat = gql`
  subscription ChatSubscription {
    chatUpdates {
      ...Chat
    }
  }
  ${fragmentChat}
`
