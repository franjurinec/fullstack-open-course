import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';
import useRepository from '../../hooks/useRepository';
import theme from '../../theme';
import RepositoryItem from '../Common/RepositoryItem';
import Text from '../Common/Text';

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    padding: 16
  },
  reviewRating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.colors.primary
  },
  reviewRatingText: {
    color: theme.colors.primary,
    fontSize: 18
  },
  reviewContentContainer: {
    display: 'flex',
    paddingStart: 16,
    flex: 1,
    flexWrap: 'wrap'
  },
  reviewDescription: {
    paddingTop: 6
  }
})

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.reviewRating}>
      <Text style={styles.reviewRatingText} fontWeight="bold">{review.rating}</Text>
    </View>
    <View style={styles.reviewContentContainer}>
      <Text fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
      <Text fontSize="subheading">{format(Date.parse(review.createdAt), 'dd.MM.yyyy')}</Text>
      <Text style={styles.reviewDescription} >{review.text}</Text>
    </View>
  </View>
);

const RepositoryDetailed = () => {
  const { id } = useParams()
  const { repository } = useRepository(id)

  const reviews = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  if (repository) return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} detailed />}
    />
  )
}

export default RepositoryDetailed;