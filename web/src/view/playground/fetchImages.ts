/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client'

export const fragmentImages = gql`
  fragment Images on Images {
    name
    data
  }
`

export const fetchImages = gql`
  query FetchImages {
    images {
      ...Images
    }
  }
  ${fragmentImages}
`
// export const subscribeChat = gql`
//   subscription ChatSubscription {
//     chatUpdates {
//       ...Chat
//     }
//   }
//   ${fragmentChat}
// `
