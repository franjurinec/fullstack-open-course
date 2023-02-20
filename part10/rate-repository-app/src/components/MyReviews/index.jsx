import { FlatList, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import theme from '../../theme';
import Text from '../Common/Text';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
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
  },
  separator: {
    height: 10,
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.reviewRating}>
      <Text style={styles.reviewRatingText} fontWeight="bold">{review.rating}</Text>
    </View>
    <View style={styles.reviewContentContainer}>
      <Text fontSize="subheading" fontWeight="bold">{review.repository.fullName}</Text>
      <Text fontSize="subheading">{format(Date.parse(review.createdAt), 'dd.MM.yyyy')}</Text>
      <Text style={styles.reviewDescription} >{review.text}</Text>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, loading } = useQuery(ME, {fetchPolicy: 'cache-and-network', variables: {includeReviews: true}})

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  
  console.log(reviews)

  if (!loading) return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews;