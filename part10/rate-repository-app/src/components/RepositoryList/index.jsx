import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../Common/RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  orderSelect: {
    padding:10,
    margin: 10,
    borderWidth: 0,
    backgroundColor: 'transparent'
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

const RepoisoryListHeader = ({ selectedOrder, setSelectedOrder }) => {

  return (
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
  )
}


const PressableRepositoryItem = ({ repository }) => {
  const navigate = useNavigate()
  const navigateToDetailed = () => navigate(`/repository/${repository.id}`)
  return (
    <Pressable onPress={navigateToDetailed}>
      <RepositoryItem repository={repository} />
    </Pressable>
  )
}

export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PressableRepositoryItem repository={item} />}
      ListHeaderComponent={<RepoisoryListHeader selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(Object.keys(orderOptions)[0]);
  const { repositories } = useRepositories(orderOptions[selectedOrder].value);
  return <RepositoryListContainer selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} repositories={repositories} />;
};

export default RepositoryList;