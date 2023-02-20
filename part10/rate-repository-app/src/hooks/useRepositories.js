import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (searchQuery, order) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
        searchKeyword: searchQuery,
        ...order
    }
  })
  const repositories = data ? data.repositories : undefined;
  
  return { repositories, loading, refetch };
};

export default useRepositories;