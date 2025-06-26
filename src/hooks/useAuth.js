import { useAuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { user, token, login, logout, loading, setLoading, setUser } = useAuthContext();
  return { user, token, login, logout, loading, setLoading, setUser };
};


export default useAuth;
