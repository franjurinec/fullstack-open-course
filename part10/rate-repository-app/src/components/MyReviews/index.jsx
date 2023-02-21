import { FlatList, Pressable, StyleSheet, View, Alert, Platform } from 'react-native';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';
import theme from '../../theme';
import Text from '../Common/Text';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import { DELETE_REVIEW } from '../../graphql/mutations';

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 16
  },
  horizontalContainer: {
    display: 'flex',
    flexDirection: 'row'
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
  reviewButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  blueButton: {
    flexGrow: 1,
    marginHorizontal: 8,
    marginTop: 16,
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  redButton: {
    flexGrow: 1,
    marginHorizontal: 8,
    marginTop: 16,
    padding: 16,
    backgroundColor: theme.colors.error,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white'
  },
  separator: {
    height: 10,
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review, navigate, deleteReview }) => {

  const navigateToRepository = () => navigate(`/repository/${review.repository.id}`)

  const deleteReviewWithConfirmation = () => {
    if (Platform.OS !== 'web') {
      Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteReview(review.id)
        },
      ]);
    } else {
      deleteReview(review.id)
    }
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.horizontalContainer}>
        <View style={styles.reviewRating}>
          <Text style={styles.reviewRatingText} fontWeight="bold">{review.rating}</Text>
        </View>
        <View style={styles.reviewContentContainer}>
          <Text fontSize="subheading" fontWeight="bold">{review.repository.fullName}</Text>
          <Text fontSize="subheading">{format(Date.parse(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.reviewDescription} >{review.text}</Text>
        </View>
      </View>

      <View style={styles.reviewButtons}>
        <Pressable style={styles.blueButton} onPress={navigateToRepository}>
          <Text style={styles.buttonText} fontWeight="bold">View repository</Text>
        </Pressable>
        <Pressable style={styles.redButton} onPress={deleteReviewWithConfirmation}>
          <Text style={styles.buttonText} fontWeight="bold">Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, { fetchPolicy: 'cache-and-network', variables: { includeReviews: true } })
  const [deleteReview] = useMutation(DELETE_REVIEW)
  const navigate = useNavigate()

  const deleteAndRefetch = async (id) => {
    await deleteReview({ variables: { id } })
    refetch()
  }

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews)

  if (!loading) return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} deleteReview={deleteAndRefetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReviews;