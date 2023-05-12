import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SERVICE_NAME } from '../constants/AppConstants';
import { LANDING_URL } from '../constants/AppUrlConstants';

const Message = ({
  button,
  message,
  redirectURL,
  title,
}) => {
  const navigate = useNavigate();
  document.title = title || SERVICE_NAME;

  return (
    <>
      <div className="thisApp-grid-row">
        <div className="thisApp-grid-column-full">
          <h1 className="thisApp-heading-xl">{title}</h1>
        </div>
      </div>
      <div className="thisApp-grid-row">
        <div className="thisApp-grid-column-two-thirds">
          {message && <p className="thisApp-body">{message}</p>}
          {button && (
            <button
              className="thisApp-button"
              data-module="thisApp-button"
              type="button"
              onClick={() => { navigate(button?.buttonNavigateTo, button?.buttonState); }}
            >
              {button?.buttonLabel}
            </button>
          )}
          {!button && (
            <Link className="thisApp-link" to={redirectURL || LANDING_URL}>Click here to continue</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;

Message.propTypes = {
  button: PropTypes.shape({
    buttonLabel: PropTypes.string.isRequired,
    buttonNavigateTo: PropTypes.string.isRequired,
    buttonState: PropTypes.object,
  }),
  message: PropTypes.string,
  redirectURL: PropTypes.string,
  title: PropTypes.string.isRequired,
};
