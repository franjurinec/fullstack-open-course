import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../Common/RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderSelect: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  search: {
    margin: 10,
    backgroundColor: 'white'
  }
});

const orderOptions = {
  latest: {
    label: "Latest repositories",
    value: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC"
    }
  },
  highestRated: {
    label: "Highest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC"
    }
  },
  lowestRated: {
    label: "Lowest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC"
    }
  }
}

const ItemSeparator = () => <View style={styles.separator} />

const RepoisoryListHeader = ({
  searchQuery,
  setSearchQuery,
  selectedOrder,
  setSelectedOrder
}) => {

  const onChangeSearch = query => setSearchQuery(query);

  return (<>
    <Searchbar
      style={styles.search}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />

    <Picker
      style={styles.orderSelect}
      selectedValue={selectedOrder}
      onValueChange={(itemValue) =>
        setSelectedOrder(itemValue)
      }>
      {Object.keys(orderOptions).map(key =>
        <Picker.Item
          key={key}
          value={key}
          label={orderOptions[key].label} />)}
    </Picker>
  </>
  )
}


const PressableRepositoryItem = ({ repository, navigate }) => {
  const navigateToDetailed = () => navigate(`/repository/${repository.id}`)
  return (
    <Pressable onPress={navigateToDetailed}>
      <RepositoryItem repository={repository} />
    </Pressable>
  )
}



export const RepositoryListContainer = ({
  navigate,
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchQuery,
  setSearchQuery,
  onEndReach
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <PressableRepositoryItem
        navigate={navigate}
        repository={item} />}
      ListHeaderComponent={<RepoisoryListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const [selectedOrder, setSelectedOrder] = useState(Object.keys(orderOptions)[0]);
  const { repositories, loading, fetchMore } = useRepositories({
    first: 5,
    searchKeyword: debouncedSearchQuery,
    ...orderOptions[selectedOrder].value
  });

  const onEndReach = () => {
    console.log('End reached!')
    fetchMore()
  }

  if (!loading) return (
    <RepositoryListContainer
      onEndReach={onEndReach}
      navigate={navigate}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      repositories={repositories} />
  )
};

export default RepositoryList;