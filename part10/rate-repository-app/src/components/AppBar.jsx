import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBarBackground
  }
});

const AppBar = () => (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab title="Repositories" routeTo="/" />
      <AppBarTab title="Sign in" routeTo="/signIn" />
    </ScrollView>
  </View>
)


export default AppBar;