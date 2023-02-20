import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id
    }
  })
  
  return { repository: data?.repository, loading, refetch };
};

export default useRepository;