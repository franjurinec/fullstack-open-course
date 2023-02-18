import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

const App = () => <>
  <NativeRouter>
    <Main />
  </NativeRouter>
  <StatusBar style="auto" />
</>


export default App