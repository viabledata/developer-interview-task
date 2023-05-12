import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DISPLAY_DETAILS,
  DISPLAY_GROUPED,
  DISPLAY_SINGLE,
  FIELD_CONDITIONAL,
  FIELD_EMAIL,
  FIELD_PASSWORD,
  FIELD_PHONE,
  FIELD_TEXT,
  FIELD_RADIO,
  DISPLAY_PASSWORD,
} from '../../constants/AppConstants';
import InputConditional from './InputConditional';
import InputRadio from './InputRadio';
import InputText from './InputText';

const DetailsInput = ({
  error, fieldName, fieldToReturn, hint, label, linkText,
}) => {
  /*
   * isOpen needs to be set to state so that it persists
   * the open state even when errors clear
   * If we did open={!!error} within the details tag
   * then when the user starts typing in the field and the
   * error clears, it would become open=false
   * and the details component would close
   */
  const [isOpen, setIsOpen] = useState();

  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  return (
    <div className="thisApp-grid-row">
      <div className="thisApp-grid-column-one-half">
        <div className={error ? 'thisApp-form-group thisApp-form-group--error' : 'thisApp-form-group'}>
          <details className="thisApp-details" data-module="thisApp-details" data-testid="details-component" open={isOpen}>
            <summary className="thisApp-details__summary">
              <span className="thisApp-details__summary-text">
                {linkText}
              </span>
            </summary>
            <div className="thisApp-details__text">
              <label className="thisApp-label" htmlFor={`${fieldName}-input`}>
                {label}
              </label>
              <div id={`${fieldName}-hint`} className="thisApp-hint">
                {hint}
              </div>
              <p id={`${fieldName}-error`} className="thisApp-error-message">
                <span className="thisApp-visually-hidden">Error:</span> {error}
              </p>
              {fieldToReturn}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

const GroupedInputs = ({
  error, fieldName, fieldToReturn, hint, label, legendAsH1,
}) => (
  <div className="thisApp-grid-row">
    <div className="thisApp-grid-column-full">
      <div className={error ? 'thisApp-form-group thisApp-form-group--error' : 'thisApp-form-group'}>
        <fieldset className="thisApp-fieldset">
          {legendAsH1
            ? (
              <legend className="thisApp-fieldset__legend thisApp-fieldset__legend--xl">
                <h1 className="thisApp-fieldset__heading">
                  {label}
                </h1>
              </legend>
            )
            : (
              <legend className="thisApp-fieldset__legend">
                {label}
              </legend>
            )}
          <div id={`${fieldName}-hint`} className="thisApp-hint">
            {hint}
          </div>
          <p id={`${fieldName}-error`} className="thisApp-error-message">
            <span className="thisApp-visually-hidden">Error:</span> {error}
          </p>
          {fieldToReturn}
        </fieldset>
      </div>
    </div>
  </div>
);

const SingleInput = ({
  error, children, fieldName, fieldToReturn, hint, label,
}) => (
  <div className="thisApp-grid-row">
    {children || null}
    <div className="thisApp-grid-column-one-half">
      <div className={error ? 'thisApp-form-group thisApp-form-group--error' : 'thisApp-form-group'}>
        <label className="thisApp-label" htmlFor={`${fieldName}-input`}>
          {label}
        </label>
        <div id={`${fieldName}-hint`} className="thisApp-hint">
          {hint}
        </div>
        <p id={`${fieldName}-error`} className="thisApp-error-message">
          <span className="thisApp-visually-hidden">Error:</span> {error}
        </p>
        {fieldToReturn}
      </div>
    </div>
  </div>
);

const determineFieldType = ({
  allErrors, children, error, fieldDetails, parentHandleChange,
}) => {
  const displayType = fieldDetails.displayType ? fieldDetails.displayType : DISPLAY_SINGLE;
  let fieldToReturn;
  switch (fieldDetails.type) {
    case FIELD_CONDITIONAL: fieldToReturn = (
      <InputConditional
        errors={allErrors} // allows us to add the error handling logic for conditional fields only on those fields
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
      />
    );
      break;

    case FIELD_EMAIL: fieldToReturn = (
      <InputText
        autoComplete="email"
        error={error} // if error true, error styling applied to input
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
        type="email"
      />
    );
      break;

    case FIELD_PASSWORD: fieldToReturn = (
      <InputText
        error={error}
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
        type="password"
        dataTestid={`${fieldDetails.fieldName}-passwordField`}
      />
    );
      break;

    case FIELD_PHONE: fieldToReturn = (
      <InputText
        autoComplete="tel"
        error={error} // if error true, error styling applied to input
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
        type="tel"
      />
    );
      break;

    case FIELD_RADIO: fieldToReturn = (
      <InputRadio
        // there is no input level error styling on a radio button so we do not pass error down here
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
        type="radio"
      />
    );
      break;

    case FIELD_TEXT: fieldToReturn = (
      <InputText
        error={error}
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
        type="text"
      />
    );
      break;

    default: fieldToReturn = null;
  }

  return (
    <>
      {displayType === DISPLAY_DETAILS
        && (
          <DetailsInput
            allErrors={allErrors}
            error={error}
            fieldName={fieldDetails.fieldName}
            fieldToReturn={fieldToReturn}
            hint={fieldDetails.hint}
            label={fieldDetails.label}
            linkText={fieldDetails.linkText}
          />
        )}
      {displayType === DISPLAY_GROUPED
        && (
          <GroupedInputs
            allErrors={allErrors}
            error={error}
            fieldName={fieldDetails.fieldName}
            fieldToReturn={fieldToReturn}
            hint={fieldDetails.hint}
            label={fieldDetails.label}
            legendAsH1={fieldDetails.labelAsH1}
          />
        )}
      {displayType === DISPLAY_SINGLE
        && (
          <SingleInput
            error={error}
            fieldName={fieldDetails.fieldName}
            fieldToReturn={fieldToReturn}
            hint={fieldDetails.hint}
            label={fieldDetails.label}
          />
        )}
      {displayType === DISPLAY_PASSWORD
        && (
          <SingleInput
            error={error}
            fieldName={fieldDetails.fieldName}
            fieldToReturn={fieldToReturn}
            hint={fieldDetails.hint}
            label={fieldDetails.label}
          >
            {children}
          </SingleInput>
        )}
    </>
  );
};

export default determineFieldType;

determineFieldType.propTypes = {
  allErrors: PropTypes.array,
  children: PropTypes.node,
  error: PropTypes.string,
  fieldDetails: PropTypes.objectOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      hint: PropTypes.string,
      label: PropTypes.string.isRequired,
      linkText: PropTypes.string,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ),
  parentHandleChange: PropTypes.func.isRequired,
};

DetailsInput.propTypes = {
  error: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  fieldToReturn: PropTypes.object.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

GroupedInputs.propTypes = {
  error: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  fieldToReturn: PropTypes.object.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
  legendAsH1: PropTypes.bool,
};

SingleInput.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node,
  fieldName: PropTypes.string.isRequired,
  fieldToReturn: PropTypes.object.isRequired,
  hint: PropTypes.string,
  label: PropTypes.string.isRequired,
};
