import http from 'k6/http'
import { Count, Rate} from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      //
      executor: 'ramping-arrival-rate',
      startRate: '50',
      timeUnit: '1s',
      perAllocatedVUs: 50,
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
    '{"operationName": "AnswerSurveyQuestion", "variables":{"input":{"answer":"haha","questionId":1}}},"query":"mutation AnswerSurveyQuestion($input: SurveyInput!) {\\n answerSurvey(input: $input)\\n}\\n"}',
    {
      headers:{
        'Content-Type': 'application/json',
      },
    }
  )
}