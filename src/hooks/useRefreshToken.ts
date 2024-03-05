import { useDispatch, useSelector } from 'react-redux';
import { useAuth, setToken } from '../store/auth'; 
import axios from "../api/axios";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const { refreshToken } = useSelector(useAuth);

  const refresh = async () => {
    let verifyAppToken = false;

    try {
      let storageToken: string | null = localStorage.getItem("refresh");
      if (storageToken !== null) {
        storageToken = JSON.parse(storageToken);
      }

      await axios.post('/token/verify', { token: storageToken }, {
        headers: { Authorization: `Bearer ${storageToken}` },
      });

      verifyAppToken = true;
    } catch (error) {
      verifyAppToken = false;
      console.error('Error verifying token:', error);
    }

    if (verifyAppToken) {
      try {
        let storageToken: string | null = localStorage.getItem("refresh");
        if (storageToken !== null) {
          storageToken = JSON.parse(storageToken);
        }
  
        const response = await axios.post('/token/refresh', { refresh: refreshToken || storageToken }, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const newToken = response.data.access;
        dispatch(setToken(newToken));
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
