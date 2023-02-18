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
