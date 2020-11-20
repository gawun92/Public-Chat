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

// export default function () {

// }