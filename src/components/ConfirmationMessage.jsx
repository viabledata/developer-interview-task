import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SERVICE_NAME } from '../constants/AppConstants';

const ConfirmationMessage = ({
  children,
  confirmationMessage,
  pageTitle,
  nextPageLink,
  nextPageLinkText,
}) => {
  document.title = `${pageTitle}` || SERVICE_NAME;

  return (
    <div className="thisApp-grid-row">
      <div className="thisApp-grid-column-two-thirds">
        <div className="thisApp-panel thisApp-panel--confirmation">
          <h1 className="thisApp-panel__title thisApp-!-margin-bottom-6">
            {`${confirmationMessage}`}
          </h1>
        </div>
        {children}
        <Link
          to={nextPageLink}
        >
          {nextPageLinkText}
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationMessage;

ConfirmationMessage.propTypes = {
  children: PropTypes.node, // allows any renderable object
  confirmationMessage: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  nextPageLink: PropTypes.string.isRequired,
  nextPageLinkText: PropTypes.string.isRequired,
};
