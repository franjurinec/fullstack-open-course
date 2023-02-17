import { View, StyleSheet } from 'react-native';
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

const AppBar = () => {
  return <View style={styles.container}>
      <AppBarTab title='Repositories' />
    </View>;
};

export default AppBar;