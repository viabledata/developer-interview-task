# Form Creator

This example shows how to create a new input type that can be reused on forms.

## <a id="CreateInput"></a>Create a new input type

Grouped inputs are inputs that require a fieldset, and use legend.
e.g. radio buttons, checkboxes, multiple grouped text inputs

This how to uses the date fieldset as an example

### 1. Create your input component

- Create a new file in `src/components/formFields/`
- Title it `Input` followed by the type of input e.g. `InputRadio.jsx` or `InputAddress.jsx`

In this example we created `InputDate.jsx`

Setup your PropTypes

Some prop types may not be required for this type of field, e.g. 
- inputMode is used for `InputDate.jsx` but not other fields.
- autocomplete and data-test-id is needed for `InputText.jsx`
- type is also needed for `InputText.jsx` as a text input could be a type of email, password, or regular text. But it is not needed for `InputRadio` as a radio input will always be radio.

Example for Date fields (a grouped field)
```javascript
InputDate.propTypes = {
  fieldDetails: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    hint: PropTypes.string,
    className: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
```

Create your component

```javascript
const InputDate = ({ fieldDetails, handleChange }) => {
  return (
    <div className="thisApp-date-input" id={`${fieldDetails.fieldName}-input`}>
      <div className="thisApp-date-input__item">
        <div className="thisApp-form-group">
          <label className="thisApp-label thisApp-date-input__label" htmlFor={`${fieldDetails.fieldName}-input-day`}>
            Day
          </label>
          <input
            className="thisApp-input thisApp-date-input__input thisApp-input--width-2"
            id={`${fieldDetails.fieldName}-input-day`}
            name={`${fieldDetails.fieldName}-input-day`}
            type="text"
            inputMode="numeric"
            onChange={handleChange}
            aria-describedby={fieldDetails.hint ? `${fieldDetails.fieldName}-hint` : null}
          />
        </div>
      </div>
      <div className="thisApp-date-input__item">
        <div className="thisApp-form-group">
          <label className="thisApp-label thisApp-date-input__label" htmlFor={`${fieldDetails.fieldName}-input-month`}>
            Month
          </label>
          <input
            className="thisApp-input thisApp-date-input__input thisApp-input--width-2"
            id={`${fieldDetails.fieldName}-input-month`}
            name={`${fieldDetails.fieldName}-input-month`}
            type="text"
            inputMode="numeric"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="thisApp-date-input__item">
        <div className="thisApp-form-group">
          <label className="thisApp-label thisApp-date-input__label" htmlFor={`${fieldDetails.fieldName}-input-year`}>
            Year
          </label>
          <input
            className="thisApp-input thisApp-date-input__input thisApp-input--width-4"
            id={`${fieldDetails.fieldName}-input-year`}
            name={`${fieldDetails.fieldName}-input-year`}
            type="text"
            inputMode="numeric"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
```

### 2. Add your input type to the switch statement on DetermineFieldType

Create a constant for your field type in `src/constants/AppConstants` and import it, and your new input file (e.g. `InputDate`) into `src/components/formFields/DetermineFieldType.jsx`

```javascript
export const FIELD_DATE = 'date';
```

Add an item to the switch statement in `DetermineFieldType`

```javascript
...

switch (fieldDetails.type) {

    case FIELD_DATE: fieldToReturn = (
      <InputDate
        error={error} // if error true, error styling applied to input
        fieldDetails={fieldDetails}
        handleChange={parentHandleChange}
      />
    );
      break;
...
```
