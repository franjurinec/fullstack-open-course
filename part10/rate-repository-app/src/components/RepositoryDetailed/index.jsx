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
    paddingHorizontal: 16,
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  wrappedTextContainer: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingEnd: 10
  },
  reviewDescription: {
    flex: 1, 
    flexWrap: 'wrap'
  }
})

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.reviewRating}>
      <Text style={styles.reviewRatingText} fontWeight="bold">{review.rating}</Text>
    </View>
    <View style={styles.reviewContentContainer}>
      <View style={styles.wrappedTextContainer}>
        <Text fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
      </View>
      <View style={styles.wrappedTextContainer}>
        <Text fontSize="subheading">{format(Date.parse(review.createdAt), 'dd.MM.yyyy')}</Text>
      </View>
      <View style={styles.wrappedTextContainer}>
        <Text style={styles.reviewDescription} >{review.text}</Text>
      </View>
    </View>
  </View>
);

const RepositoryDetailed = () => {
  const { id } = useParams()
  const { repository, loading, fetchMore } = useRepository({
    id,
    first: 10
  })

  const reviews = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => fetchMore()

  if (!loading) return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} detailed />}
    />
  )
}

export default RepositoryDetailed;