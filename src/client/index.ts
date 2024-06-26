import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client"
import { onError } from '@apollo/client/link/error'
import { RetryLink } from "@apollo/client/link/retry"

const httpLink = new HttpLink({
  uri: 'https://graphqlzero.almansi.me/api', 
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error
  }
})

const createApolloClient = () => {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, retryLink, httpLink]),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient