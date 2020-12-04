/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'

export const fragmentUser = gql`
  fragment User on User {
    name
  }
`

export const fetchUser = gql`
  query FetchUser {
    user {
      ...User
    }
  }
  ${fragmentUser}
`