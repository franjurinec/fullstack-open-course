import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { useAuthStorage } from '../../hooks/useAuthStorage';

const SignOut = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  
  useEffect(() => {
    authStorage.removeAccessToken()
      .then(() => apolloClient.resetStore())
      .then(() => navigate('/signIn')) 
  }, [])
}

export default SignOut;