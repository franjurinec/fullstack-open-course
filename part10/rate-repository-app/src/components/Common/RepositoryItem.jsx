import { Image, Pressable, StyleSheet, View } from "react-native";
import millify from "millify";
import * as Linking from 'expo-linking';
import theme from "../../theme";
import Text from "../Common/Text"

const styles = StyleSheet.create({
  repositoryItem: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 18
  },
  tinyLogo: {
    width: 56,
    height: 56,
    borderRadius: 8,
    flexGrow: 0
  },
  horizontalFlexbox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'baseline',
    marginStart: 18,
    flexGrow: 1,
    flex: 1,
    flexWrap: 'wrap'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  statContainer: {
    marginTop: 18,
    display: 'flex',
    alignItems: 'center'
  },
  description: {
    marginTop: 4
  },
  label: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 6,
    marginTop: 8,
    color: 'white',
  },
  gitHubButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gitHubButtonText: {
    color: 'white'
  }
})

const millifyConfig = {
  lowercase: true
}

const Stat = ({ label, value }) => (
  <View style={styles.statContainer}>
    <Text fontWeight={'bold'}>{millify(value, millifyConfig)}</Text>
    <Text fontSize={'subheading'}>{label}</Text>
  </View>
)

const RepositoryItem = ({ repository, detailed }) => {

  const onGitHubClicked = () => Linking.openURL(repository.url)

  return (
    <View testID="repositoryItem" style={styles.repositoryItem}>
      <View style={styles.horizontalFlexbox}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.titleContainer}>
          <Text fontWeight={'bold'} >{repository.fullName}</Text>
          <Text style={styles.description} fontSize={'subheading'} >{repository.description}</Text>
          <Text style={styles.label}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Stat label={'Stars'} value={repository.stargazersCount} />
        <Stat label={'Forks'} value={repository.forksCount} />
        <Stat label={'Reviews'} value={repository.reviewCount} />
        <Stat label={'Rating'} value={repository.ratingAverage} />
      </View>
      {(detailed && repository.url) && (
        <Pressable style={styles.gitHubButton} onPress={onGitHubClicked}>
          <Text style={styles.gitHubButtonText} fontWeight="bold" >Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  )
}

export default RepositoryItem