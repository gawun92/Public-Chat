/* eslint-disable prettier/prettier */
import http from 'k6/http'

export const options = {
  scenarios: {
    standard: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 1000,
      stages: [
        { duration: '50s', target: 100 },
        { duration: '50s', target: 100 },
      ],
    },
  },
}


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
  const payload = JSON.stringify({

    operationName: 'updateUserBadWordCount',
    variables: {
      name: "Yingge",
      text: "345"
    },
    query:
      'mutation updateUserBadWordCount($username: String!, $save_BW: String!)  {\\n updateUserBadWordCount($username: String, $save_BW: String)\\n}\\n"}'
  })
  const params = {
    headers: {
      'Content-Type': 'application/json',
      cookies: {
        authToken: data.authToken,
      },
    },
  }
  http.post('http://localhost:3005/graphql', payload, params)
}