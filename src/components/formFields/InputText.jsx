import PropTypes from 'prop-types';

const InputText = ({
  autoComplete, dataTestid, error, fieldDetails, handleChange, type,
}) => {
  const classToApply = error ? 'thisApp-input thisApp-input--error' : 'thisApp-input';
  return (
    <input
      className={classToApply}
      id={`${fieldDetails.fieldName}-input`}
      data-testid={dataTestid}
      name={fieldDetails.fieldName}
      type={type}
      autoComplete={autoComplete}
      onChange={handleChange}
      onPaste={handleChange}
      aria-describedby={fieldDetails.hint ? `${fieldDetails.fieldName}-hint` : null}
      defaultValue={fieldDetails.value}
    />
  );
};

InputText.propTypes = {
  autoComplete: PropTypes.string,
  dataTestid: PropTypes.string,
  error: PropTypes.string,
  fieldDetails: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    hint: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputText;
