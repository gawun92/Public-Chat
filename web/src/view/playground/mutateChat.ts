/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

const sendChatMutation = gql`
  mutation SendChat($name: String!) {
    sendChat(name: $name)
  }
`

export function sendChat(name: string) {
  return getApolloClient().mutate<any, any>({
    mutation: sendChatMutation,
    variables: { name },
  })
}
