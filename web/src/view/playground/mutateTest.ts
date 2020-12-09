import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

const IndiChatMutation = gql`
  mutation IndiChat($name: String!) {
    IndiChat(name: $name)
  }
`

export function IndiChat(name: string) {
  return getApolloClient().mutate<any, any>({
    mutation: IndiChatMutation,
    variables: { name },
  })
}
