import { gql } from 'react-apollo'

export const fetchPrompt = gql`
  query fetchPrompt($date:String!) {
    prompt(date:$date) {
      date,
      id,
      prompt
    }
  }`
