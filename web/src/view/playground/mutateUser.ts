import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

const UpdateUserBadWordCountMutation = gql`
  mutation updateUserBadWordCount($username: String!, $save_BW: String!) {
    updateUserBadWordCount(username: $username, save_BW: $save_BW)
  }
`

export function UpdateUserBadWordCount(username: string, save_BW: string) {
  return getApolloClient().mutate<any, any>({
    mutation: UpdateUserBadWordCountMutation,
    variables: { username, save_BW },
  })
}
