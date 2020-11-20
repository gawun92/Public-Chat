import http from 'k6/http'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      //
      executor: 'ramping-arrival-rate',
      startRate: '50',
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        {target: 200, duration: '30s'},
        {target: 0, duration: '30s'},
      ],
    },
  },
}


export default function(){
  http.post(
    'http://localhost:3005/graphql',
    '{"operationName": "updateChatHistory", "variables":{"name":"Yingge","text":"I am stupid"},"query":"mutation updateChatHistory($name: String!, $text: String!)  {\\n updateChatHistory(name: $name, text: $text)\\n}\\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

