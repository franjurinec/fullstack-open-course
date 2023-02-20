import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../Common/RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const PressableRepositoryItem = ({ repository }) => {
  const navigate = useNavigate()
  const navigateToDetailed = () => navigate(`/repository/${repository.id}`)
  return (
    <Pressable onPress={navigateToDetailed}>
      <RepositoryItem repository={repository} />
    </Pressable>
  )
}

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PressableRepositoryItem repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;