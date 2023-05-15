import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ScrollToTopOnNewPage = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.activeElement.blur(); // deselect the link so it doesn't remain in the focus state when page loads
  }, [location.pathname]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default ScrollToTopOnNewPage;

ScrollToTopOnNewPage.propTypes = {
  children: PropTypes.node, // allows any renderable object
};
