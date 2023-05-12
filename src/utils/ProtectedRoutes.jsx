import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SIGN_IN_URL } from '../constants/AppUrlConstants';

const ProtectedRoutes = ({ isPermittedToView }) => {
  const location = useLocation();

  return (
    isPermittedToView ? <Outlet /> : <Navigate to={SIGN_IN_URL} state={{ redirectURL: location }} replace />
  );
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  isPermittedToView: PropTypes.bool.isRequired,
};
