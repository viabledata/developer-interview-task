# Form Creator

Below is a step by step example of creating a new form using the creator components.

## <a id="CreateForm"></a>Create a form

1. [Add formActions](#AddFormActions)
2. [Add formFields](#AddFormFields)
3. [Add validation rules (if required)](#AddValidationRunes)
4. [Add handleSubmit ](#AddHandleSubmit)
6. [Add <DisplayForm> to your return](#AddDisplayForm)

### 1. <a id="AddFormActions"></a>Add formActions

Go to the page or component file you want to add your form to (or create your page if it's for a new page).

Determine which form actions you need
 - submit
 - cancel

Create an object of formActions for your form

```javascript
  const formActions = {
    submit: {
      label: 'Save',
    },
    cancel: {
      label: 'Cancel',
      redirect_URL: YOUR_URL
    }
  };
```

### 2. <a id="AddFormFields"></a>Add formFields

Create an object of formFields for your form

_For this example we'll add a text input of type text and a set of 3 radio buttons_

```javascript
const formFields = [
    {
      type: FIELD_TEXT,
      displayType: DISPLAY_SINGLE,
      fieldName: 'firstName',
      hint: 'Enter your first name',
      label: 'First name',
    },
    {
      type: FIELD_RADIO,
      className: 'app-radios',
      displayType: DISPLAY_GROUPED,
      fieldName: 'favouriteColour',
      label: 'What is your favourite colour',
      radioOptions: [
        {
          checked: CHECKED_FALSE,
          id: 'red',
          label: 'Red',
          name: 'favouriteColour',
          value: 'red',
        },
        {
          checked: CHECKED_FALSE,
          id: 'blue',
          label: 'Blue',
          name: 'favouriteColour',
          value: 'blue',
        },
        {
          checked: CHECKED_FALSE,
          id: 'green',
          label: 'Green',
          name: 'favouriteColour',
          value: 'green',
        },
        {
          checked: CHECKED_FALSE,
          id: 'other',
          label: 'Other',
          name: 'favouriteColour',
          value: 'other',
        },
      ],
    },
  ];

  ```

### 3. <a id="AddValidationRules"></a>Add validation rules (if required)

Into your formField object, add any validation rules for each field.

Each field can take multiple rules, they're tested in the order you provide them and the first rule to fail is the one displayed to the user.

_NOTE: If you have a new type of validation, you can add it's rule to the `src/utils/Validator.jsx` file._

Example rule types
- VALIDATE_REQUIRED : field must not be empty
- VALIDATE_MIN_LENGTH : if field is not empty then it must have at least the specified number of characters in it
- VALIDATE_EMAIL_ADDRESS : if field is not empty, then it must match a regex test for including `@` and `.xx` where x is any letter

Validation objects must have a type and a message, and if there are additional conditions (such as min length) a condition.

_For this example we will require the text field to have a min length of 2 characters and the date field to be completed._

```javascript
  code sample goes here
```

### 4. <a id="AddHandleSubmit"></a>Add handleSubmit 

_TODO: Add an example API call once those are built_

Add your handleSubmit function. You need to include:
- what to do with the data from the form (PATCH, POST, etc.)
- where to navigate to if the action completes successfully
- what to do if the action fails

If you use a confirmation page
- you must include the form name
- you must include the next page link and the name it relates to
- you *may* include a reference number if you have one available

```javascript
 code sample goes here
```

### 6. <a id="AddDisplayForm"></a>Add <DisplayForm> to your return

Add the DisplayForm component to your return

```javascript
  code sample goes here
```

### Your final page component will then look something like this:

```javascript
code sample goes here

```