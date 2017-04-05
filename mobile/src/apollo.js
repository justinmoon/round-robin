import { ApolloClient, createNetworkInterface } from 'react-apollo'

const apollo = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://round-robin-api.ngrok.io/api/graphql'
  })
})
export default apollo
