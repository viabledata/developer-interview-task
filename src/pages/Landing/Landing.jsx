import { Link } from 'react-router-dom';
import { SERVICE_NAME } from '../../constants/AppConstants';
import { PAGE_ONE_URL, REGISTER_ACCOUNT_URL, SIGN_IN_URL } from '../../constants/AppUrlConstants';
import useUserIsPermitted from '../../hooks/useUserIsPermitted';

const Landing = () => {
  const isAuthenticated = useUserIsPermitted();
  document.title = SERVICE_NAME;

  return (
    <div className="thisApp-grid-row">
      <div className="thisApp-grid-column-two-thirds">
        <h1 className="thisApp-heading-l" data-testid="landing-h1">{SERVICE_NAME}</h1>
        <h2 className="thisApp-heading-m">Who should use this service</h2>
        <p className="thisApp-body" data-testid="createAccountParagraph">You&apos;ll also need to sign in or <Link to={REGISTER_ACCOUNT_URL}>create an account</Link> to use this service</p>
        <Link
          to={isAuthenticated ? PAGE_ONE_URL : SIGN_IN_URL}
          role="button"
          draggable="false"
          className="thisApp-button thisApp-button--start"
          data-module="thisApp-button"
        >
          Start now
        </Link>
        <h2 className="thisApp-heading-m">More help with this service</h2>
        <p className="thisApp-body">
          instructions go here
        </p>
      </div>
    </div>
  );
};

export default Landing;
