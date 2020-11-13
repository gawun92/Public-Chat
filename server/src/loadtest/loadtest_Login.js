import http from 'k6/http'

export const options = {
  scenarios: {
    example: {
      executor: 'ramping-arrival-rate',
      startRate: '50',
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [{ target: 100, duration: '30s' }],
    },
  },
}

export default function () {

  var payload = JSON.stringify({
    email: 'Yingge',
    password: '123',
  })
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  var res = http.post('http://localhost:3005/auth/login', payload, params)
  // extract authToken from res
  var authToken = '1d0463bc-0b11-4066-b4c2-5703d2cf8ff8'
  http.get('http://localhost:3005/app/profile', {
    cookies: {
      authToken: authToken,
    },
  })
}