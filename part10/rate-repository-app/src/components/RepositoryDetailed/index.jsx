import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../Common/RepositoryItem';

const RepositoryDetailed = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)
  if (repository) return <RepositoryItem repository={repository} detailed />
};

export default RepositoryDetailed;