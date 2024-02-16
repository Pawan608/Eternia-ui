// lib/apolloProvider.js
import { ApolloProvider } from "@apollo/client";
// import apolloClient from "./apollo-client";
import { client } from "./apollo";
export const ApolloProviderWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloProviderWrapper;
