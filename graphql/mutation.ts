import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      userId
      user {
        id
        email
        username
        firstName
        roles
        requests {
          id
          plan {
            id
          }
        }
        subscriptions {
          id
          plan {
            id
          }
        }
      }
    }
  }
`;

export const CREATE_REQUEST = gql`
  mutation CreateRequest($createRequestInput: CreateRequestDto!) {
    createRequest(createRequestInput: $createRequestInput) {
      id
      plan {
        id
      }
    }
  }
`;
