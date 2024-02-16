import {
  ApolloLink,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authentication token from local storage
  const token = localStorage.getItem("authToken");

  // Use the setContext method on the operation to set the HTTP headers
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});
const httpLink = new HttpLink({ uri: "http://localhost:3004/graphql" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export { client };
