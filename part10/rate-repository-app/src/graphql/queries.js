import { gql } from '@apollo/client';
import { CORE_REPOSITORY_FIELDS, CORE_REVIEW_FIELDS, DETAILED_REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query Repositories($first: Int, $after: String, $searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(first: $first, after: $after, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
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
  ${CORE_REVIEW_FIELDS}
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...CoreReviewFields
          }
        }
      }
    }
  }
`
