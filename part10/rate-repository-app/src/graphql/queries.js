import { gql } from '@apollo/client';
import { CORE_REPOSITORY_FIELDS, DETAILED_REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
            ...CoreRepositoryFields
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${DETAILED_REPOSITORY_FIELDS}
  query Repository($id: ID!) {
    repository(id: $id) {
      ...DetailedRepositoryFields
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
