import Auth from '../utils/Auth';

const useUserIsPermitted = () => {
  const isAuthenticated = !!Auth.isAuthorized();

  return isAuthenticated;
};

export default useUserIsPermitted;
