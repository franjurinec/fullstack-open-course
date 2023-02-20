import FormikTextInput from '../Common/FormikTextInput';
import Text from '../Common/Text';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  signInForm: {
    padding: 16,
    backgroundColor: "white",
    display: 'flex'
  },
  signInSpaced: {
    marginTop: 16,
  },
  signInButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButtonText: {
    color: 'white'
  }
})

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput name="owner" placeholder="Repository owner username" />
      <FormikTextInput name="repository" placeholder="Repository name" style={styles.signInSpaced} />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.signInSpaced} />
      <FormikTextInput name="review" placeholder="Review" multiline style={styles.signInSpaced} />

      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInButtonText} fontWeight="bold" >Create a review</Text>
      </Pressable>
    </View>
  )
}

export default CreateReviewForm
