import { Image, StyleSheet, View } from "react-native";
import millify from "millify";
import theme from "../theme";
import Text from "./Text"

const styles = StyleSheet.create({
  repositoryItem: {
    display: 'flex',
    gap: 18,
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
    flexDirection: 'row',
    gap: 18
  },
  titleContainer: {
    display: 'flex',
    flexGrow: 1,
    gap: 8,
    flex: 1,
    flexWrap: 1
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 24
  },
  statContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  label: {
    backgroundColor: theme.colors.accent,
    borderRadius: 4,
    padding: 6,
    color: 'white',
    width: 'fit-content'
  }
})

const millifyConfig = {
  lowercase: true
}

const RepositoryItem = ({ repository }) => (
  <View style={styles.repositoryItem}>
    <View style={styles.horizontalFlexbox}>
      <Image
        style={styles.tinyLogo}
        source={repository.ownerAvatarUrl}
      />
      <View style={styles.titleContainer}>
        <Text fontWeight={'bold'} >{repository.fullName}</Text>
        <Text fontSize={'subheading'} >{repository.description}</Text>
        <Text style={styles.label}>{repository.language}</Text>
      </View>
    </View>
    <View style={styles.statsContainer}>
      <View style={styles.statContainer}>
        <Text fontWeight={'bold'}>{millify(repository.stargazersCount, millifyConfig)}</Text>
        <Text fontSize={'subheading'}>Stars</Text>
      </View>

      <View style={styles.statContainer}>
        <Text fontWeight={'bold'}>{millify(repository.forksCount, millifyConfig)}</Text>
        <Text fontSize={'subheading'}>Forks</Text>
      </View>

      <View style={styles.statContainer}>
        <Text fontWeight={'bold'}>{millify(repository.reviewCount, millifyConfig)}</Text>
        <Text fontSize={'subheading'}>Reviews</Text>
      </View>

      <View style={styles.statContainer}>
        <Text fontWeight={'bold'}>{millify(repository.ratingAverage, millifyConfig)}</Text>
        <Text fontSize={'subheading'}>Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem