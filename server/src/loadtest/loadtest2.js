/* eslint-disable prettier/prettier */
import http from 'k6/http'

export const options = {
  scenarios: {
    standard: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '50s', target: 100 },
        { duration: '50s', target: 1000 },
      ],
      gracefulRampDown: '10s',
    },
  },
}
// export const options = {
//   scenarios: {
//     standard: {
//       executor: 'ramping-arrival-rate',
//       startRate: '50',
//       timeUnit: '1s',
//       preAllocatedVUs: 50,
//       maxVUs: 1000,
//       stages: [{ duration: '50s', target: 100 }],
//     },
//   },
// }

// initial setting - login
export function setup() {
  var payload = JSON.stringify({
    email: 'Yingge',
    password: '345',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  http.post('http://localhost:3005/auth/login', payload, params)
  var jar = http.cookieJar()
  var token = jar.cookiesForURL('http://localhost:3005').authToken[0]
  return { authToken: token }
}


export default function (data) {
  const payload = JSON.stringify(
    {"operationName":"FetchChat","variables":{},"query":"query FetchChat {\n  chat   {\n    id\n    name\n    text\n  }\n}\n"},
  )
  const params = {
    headers: {
      'Content-Type': 'application/json',
      cookies: {
        authToken: data.authToken,
      },
    },
  }
  http.post('http://localhost:3005/graphql', payload, params)

  const payload1 = JSON.stringify(
    {"operationName":"FetchImages","variables":{},"query":"query FetchImages {\n  images   {\n    name\n    data\n  }\n}\n"},
  )
  const params1 = {
    headers: {
      'Content-Type': 'application/json',
      cookies: {
        authToken: data.authToken,
      },
    },
  }
  http.post('http://localhost:3005/graphql', payload1, params1)

  const payload2 = JSON.stringify(
    {"operationName":"FetchUser","variables":{},"query":"query FetchUser {\n  user   {\n    name\n   }\n}\n"},
  )
  const params2 = {
    headers: {
      'Content-Type': 'application/json',
      cookies: {
        authToken: data.authToken,
      },
    },
  }
  http.post('http://localhost:3005/graphql', payload2, params2)

}