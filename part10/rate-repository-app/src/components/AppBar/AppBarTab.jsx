import { View, StyleSheet } from 'react-native';
import { Link } from "react-router-native";
import Text from '../Common/Text';

const styles = StyleSheet.create({
  tab: {
    padding: 24
  },
  tabText: {
    color: 'white'
  }
});

const AppBarTab = ({ title, routeTo }) => {
  return <Link to={routeTo}>
    <View style={styles.tab}>
      <Text fontWeight={'bold'} style={styles.tabText}>{title}</Text>
    </View>
  </Link>
};

export default AppBarTab;