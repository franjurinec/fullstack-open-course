import { gql } from '@apollo/client';

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    stargazersCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    fullName
    description
    forksCount
    language
  }
`;

export const CORE_REVIEW_FIELDS = gql`
  fragment CoreReviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
      fullName
    }
  }
`;

export const DETAILED_REPOSITORY_FIELDS = gql`
  ${CORE_REPOSITORY_FIELDS}
  ${CORE_REVIEW_FIELDS}
  fragment DetailedRepositoryFields on Repository {
    ...CoreRepositoryFields
    url
    reviews(first: $first, after: $after) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ...CoreReviewFields
        }
      }
    }
  }
`;
