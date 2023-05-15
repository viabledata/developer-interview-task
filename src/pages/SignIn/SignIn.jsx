import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayForm from '../../components/DisplayForm';
import {
  FIELD_EMAIL,
  FIELD_PASSWORD,
  SIGN_IN_FORM,
  VALIDATE_EMAIL_ADDRESS,
  VALIDATE_REQUIRED,
} from '../../constants/AppConstants';
import {
  SIGN_IN_ENDPOINT,
  USER_NOT_VERIFIED,
  USER_SIGN_IN_DETAILS_INVALID,
} from '../../constants/AppAPIConstants';
import {
  REGISTER_ACCOUNT_URL,
} from '../../constants/AppUrlConstants';
import Auth from '../../utils/Auth';
import { scrollToTop } from '../../utils/ScrollToElement';
import Message from '../../components/Message';

const SupportingText = () => (
  <div className="thisApp-inset-text">
    <p className="thisApp-body">
      If you do not have an account, you can <Link className="thisApp-link" to={REGISTER_ACCOUNT_URL}>create one now</Link>.
    </p>
  </div>
);

const SignIn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotActivated, setIsNotActivated] = useState(false);
  document.title = 'Sign in';

  // Form fields
  const formActions = {
    submit: {
      label: 'Sign in',
    },
  };
  const formFields = [
    {
      type: FIELD_EMAIL,
      label: 'Email address',
      fieldName: 'email',
      validation: [
        {
          type: VALIDATE_REQUIRED,
          message: 'Enter your email address',
        },
        {
          type: VALIDATE_EMAIL_ADDRESS,
          message: 'Enter a real email address',
        },
      ],
    },
    {
      type: FIELD_PASSWORD,
      label: 'Password',
      fieldName: FIELD_PASSWORD, // fieldname must be password as when fieldname is password we do not store value to session storage
      validation: [
        {
          type: VALIDATE_REQUIRED,
          message: 'Enter your password',
        },
      ],
    },
  ];

  const removeApiErrors = () => {
    if (errors) setErrors();
    setIsLoading(false);
  };

  const handleSubmit = async ({ formData }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(SIGN_IN_ENDPOINT, formData);
      if (response.data.token) { Auth.storeToken(response.data.token); }
      if (state?.redirectURL) {
        navigate(state.redirectURL, { state });
      } else {
        // navigate(LOGGED_IN_LANDING);
      }
    } catch (err) {
      if (err?.response?.data?.message === USER_SIGN_IN_DETAILS_INVALID) {
        setErrors('Email and password combination is invalid');
        scrollToTop();
      } else if (err?.response?.data?.message === USER_NOT_VERIFIED) {
        setIsNotActivated(true);
        scrollToTop();
      } else {
        // navigate(MESSAGE_URL, { state: { title: 'Something has gone wrong', message: err.response?.data?.message, redirectURL: SIGN_IN_URL } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isNotActivated) {
    const buttonProps = {
      buttonLabel: 'Send confirmation email',
      // buttonNavigateTo: REGISTER_EMAIL_RESEND_URL,
    };
    return (
      <Message
        button={buttonProps}
        title="Email address not verified"
        message="We can send you a verification link so you can continue creating your account."
      />
    );
  }

  return (
    <>
      <div className="thisApp-grid-row">
        <div className="thisApp-grid-column-two-thirds">
          {errors
            && (
              <div className="thisApp-error-summary" data-module="thisApp-error-summary">
                <div role="alert">
                  <h2 className="thisApp-error-summary__title">
                    There is a problem
                  </h2>
                  <div className="thisApp-error-summary__body">
                    <ul className="thisApp-list thisApp-error-summary__list">
                      <li className="errorText thisApp-!-font-weight-bold">
                        {errors}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <DisplayForm
        pageHeading="Sign in"
        formId="formSignIn"
        fields={formFields}
        formActions={formActions}
        formType={SIGN_IN_FORM}
        isLoading={isLoading}
        keepSessionOnSubmit={state?.redirectURL}
        handleSubmit={handleSubmit}
        removeApiErrors={removeApiErrors}
      >
        <SupportingText />
      </DisplayForm>
      <div className="thisApp-grid-row">
        <div className="thisApp-grid-column-two-thirds">
          <h2 className="thisApp-heading-m">Problems signing in</h2>
        </div>
      </div>
    </>
  );
};

export default SignIn;
