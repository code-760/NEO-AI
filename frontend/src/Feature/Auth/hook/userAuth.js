import { useDispatch } from 'react-redux';
import { getme, login, register } from '../Services/app.servise';

export const useauth = () => {
  const dispatch = useDispatch();

  const hendaregistar = async (username, email, password) => {
    try {
      dispatch(setLoading(true));
      const respose = await register({ username, email, password });
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };
 



  const hendallogin=async(email,password)=>{
    try {
      dispatch(setLoading(true));
      const response = await login({ email, pssword });
    } catch (err) {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
    }


  }


  const hendalgetme=async()=>{
    try {
      dispatch(setLoading(true));
      const response = await getme();
    } catch (err) {
      dispatch(setError(error.response?.data?.message || 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
    }


  }


  return{
    hendallogin,
    hendaregistar,
    hendalgetme
  }
};
