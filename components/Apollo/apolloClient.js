import fetch from 'node-fetch';
import  { ApolloClient, ApolloLink,HttpLink }from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import clientConfig from '../../client-config';
var username = 'web-master';
var password = 'kmkm1971website';
var basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
  
    // Use the setContext method to set the HTTP headers.
    
    operation.setContext({
        headers: {
            'Authorization': basicAuth
        }
    });
  
    // Call the next link in the middleware chain.
    return forward(operation);
  });
  const httpLink = new HttpLink({ uri: clientConfig.graphqlUrl });
const client = new ApolloClient ({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client