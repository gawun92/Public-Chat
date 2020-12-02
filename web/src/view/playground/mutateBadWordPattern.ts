import { gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'

const findBadWordMutation = gql`
  mutation findBadWord($chatStr: String!) {
    findBadWord(chatStr: $chatStr)
  }
`

export function getBadWordPattern(chatStr: string) {
  return getApolloClient().mutate<any>({
    mutation: findBadWordMutation,
    variables: { chatStr }
  })
}
