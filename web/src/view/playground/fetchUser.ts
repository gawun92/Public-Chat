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
      ...user
    }
  }
  ${fragmentUser}
`

export const subscribeUser = gql`
  subscription UserSubscription {
    userUpdates {
      ...User
    }
  }
  ${fragmentUser}
`
