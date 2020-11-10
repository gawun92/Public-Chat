import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

const UpdateChatHistoryMutation = gql`
  mutation updateChatHistory($name: String!, $text: String!) {
    updateChatHistory(name: $name, text: $text)
  }
`

export function UpdateChatHistory(name: string, text: string) {
  return getApolloClient().mutate<any, any>({
    mutation: UpdateChatHistoryMutation,
    variables: { name, text },
  })
}
