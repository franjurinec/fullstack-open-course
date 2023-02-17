import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    padding: 24
  },
  tabText: {
    color: 'white'
  }
});

const AppBarTab = ({ title }) => {
  return <Pressable>
    <View style={styles.tab}>

      <Text fontWeight={'bold'} style={styles.tabText}>{title}</Text>
    </View>
  </Pressable>
};

export default AppBarTab;