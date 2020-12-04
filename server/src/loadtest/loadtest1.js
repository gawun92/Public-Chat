import http from 'k6/http'

export const options = {
  scenarios: {
    standard: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '50s', target: 100 },
        { duration: '50s', target: 100 },
      ],
      gracefulRampDown: '10s',
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

// request : GET
export default function (data) {
  http.get('http://localhost:3005/app/index', {
    cookies: {
      authToken: data.authToken,
    },
  })
}
