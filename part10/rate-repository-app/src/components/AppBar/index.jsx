import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBarBackground
  }
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  })

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" routeTo="/" />
        {data?.me?.id ? (
          <>
            <AppBarTab title="Create a review" routeTo="/createReview" />
            <AppBarTab title="Sign out" routeTo="/signOut" />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" routeTo="/signIn" />
            <AppBarTab title="Sign up" routeTo="/signUp" />
          </>
        )}
      </ScrollView>
    </View>
  )
}


export default AppBar;