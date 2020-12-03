import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

const UpdateUserBadWordCountMutation = gql`
  mutation updateUserBadWordCount($username: String!) {
    updateUserBadWordCount(username: $username)
  }
`

export function UpdateUserBadWordCount(username: string) {
  return getApolloClient().mutate<any, any>({
    mutation: UpdateUserBadWordCountMutation,
    variables: { username },
  })
}
