# Form Creator

This app has an in built form creator with reusable components for if you wish to add more forms.

## DisplayForm
- [Display Form](#display-form)
- [File Upload Form](#file-upload-form)

## Field actions
- [Form action options](#form-action-options)

## Field types
Every input can be displayed as a single field, set of grouped fields, or contained within a `<details>` component. By default, inputs are treated as single field unless otherwise specified.

- [Display types](#display-types)

[Standard inputs](#standard-inputs)
- [Autocomplete](#autocomplete)
- [Radio buttons](#radio-buttons)
- [Radio buttons with conditional text field(s)](#conditionals)
- [Text input](#text-input)

[Specific inputs](#specific-inputs)
- [Email](#email)
- [Password](#password)
- [Phone Number](#phone-number)

[Validating fields](#validating-fields)
- [required](#required)
- [Conditional](#conditional)
- [Email Format](#email-format)
- [Match](#match)
- [Maximum Length](#maximum-length)
- [Minimum Length](#minimum-length)
- [No Spaces](#no-spaces)
- [Phone Number Format](#phone-number-format)

## SinglePage Forms
- [Single Page Form](#single-page-forms)

## MultiPage Forms
- [Multi Page Form](#multi-page-forms)


## Other guides
- <a href="link here">Create a new form - step by step example</a>
- <a href="link here">Creating a new input type</a>
- [Structure diagram for reference](#StructureDiagram) (updated November 2022)
----

## Display Form

Structure:
```javascript
<DisplayForm
  formId=<required>
  fields={formFields}
  formActions={formActions}
  formType=<required>
  isLoading=<optional boolean>
  keepSessionOnSubmit={state?.redirectURL ? true : false}
  pageHeading=<required>
  removeApiErrors=<optional>
  handleSubmit={handleSubmit}
/>
```

You can also pass children to the component
e.g. if you have a SupportingText component you would pass as follows:
```javascript
<DisplayForm
  formId=<required>
  fields={formFields}
  formActions={formActions}
  formType=<required>
  isLoading=<optional boolean>
  pageHeading=<required>
  removeApiErrors=<optional>
  handleSubmit={handleSubmit}
>
  <SupportingText />
</DisplayForm>
```

Parameters

### formId
An identifier for your form element

### formFields
Must always be {formFields} which you must define within the component that is calling the DisplayForm component. (see [Field Types](#field-actions))

### formAction
Must always be {formAction} which you must define within the component that is calling the DisplayForm component. (see [Form Action Options](#form-action-options))

### formType
Can be `SINGLE_PAGE_FORM` - if the form has one page. This will clear any session data for the form when `submit` or `back` are clicked

Or `MULTI_PAGE_FORM` - if the form has multiple pages. This will persist session data as the user moves through the form and only clear it when they go to another section of the site.

When using MULTI_PAGE_FORM you should add a `sessionStorage.removeItem('formData')` within the handleSubmit of the last page of your form.

We also have `SIGN_IN_FORM` and `PASSWORD_FORM` for some specific use cases. These should not be used for other forms.

### isLoading

When passed to `DisplayForm` as `true`, the submit action button is `disabled`.

In your container page, set `isLoading` to `false` in your useState so that on page load it is false.

Then set it to `true` before TRYing your API call. This prevents the submit button starting multiple attempts if a user clicks more than once.

### keepSessionOnSubmit

Passed in as `state?.redirectURL ? true : false` this allows the DisplayForm renderer to check if there is a `redirectURL` present in state and persist the session data for use by the next page.

Usually used for when we redirect users to sign-in if their token becomes invalid, as we want them to be able to return to where they were without loss of data.

See more in [Single page forms](#single-page-forms) below.


### pageHeading
What will be the h1 of your page. We have to pass it to the form to display as any error summary is shown ABOVE the h1

### removeApiError

Currently only used by the /sign-in page where we set a page level error as a result of the API returning a 'username/password combination not valid' error.

This is only useful if you need a specific page level error, and allows us to callback to clear the error state.

### handleSubmit
Your handleSubmit action from the page

----

## File Upload Form

Structure:
```javascript
<FileUploadForm
  endpoint=<required>
  errorMessageMapFile=<optional>
  fileNameRequired=<required>
  fileTypesAllowed=<required>
  formId=<required>
  pageHeading=<required>
  submitButtonLabel=<required>
  urlSuccessPage=<required>
  urlThisPage=<required>
>
  <SupportingText />
</FileUploadForm>
```
Parameters
### endpoint
Created on the container page and passed to this page.

e.g.
```javascript
endpoint={`${API_URL}${ENDPOINT_DECLARATION_PATH}/${declarationId}${ENDPOINT_FILE_UPLOAD_GENERAL_DECLARATION_PATH}`}
```

### errorMessageMapFile
If you do not want to use the field level error messages that are returned from the POST to the file upload endpoint (for FAL forms), you can add a mapping file and pass it through here to the file upload component, which will then use that to determine what error wording to display.

### fileNameRequired
The name of the file we expect the user to upload here. This is used in the error message if the file is missing when they attempt to submit.

e.g. `General Declaration FAL 1` or `Supporting documents`

### fileTypesAllowed
A string that can be used in error messages to alert the user to which file types are allowed, should they attempt to upload an invalid one.

e.g. `csv or xlsx` or `png, jpg or jpeg`

### formId
An identifier for your form element

### pageHeading
What will be the h1 of your page. We have to pass it to the form to display as any error summary is shown ABOVE the h1

### submittButtonLabel
The words to display on the submit button

e.g. `Check for errors`

### urlSuccessPage
The page to load next if we receive a success response from the file upload endpoint.

## urlThisPage
The url for the current page, should a users auth token become in valid, or we receive a 500 error we can load the relevant page, and put `this` page's url into state so we can enable a link for the user to return to `this` file upload page (with state persisted).

----

----

## Standard Inputs

----

----

## Text Input

Requirements

n/a

Object structure

```javascript
{
  type: FIELD_TEXT,
  displayType: DISPLAY_SINGLE,
  fieldName: <required>,
  hint: <optional>,
  label: <required>
}
```

Parameters

### type
Import and use `FIELD_TEXT` from `src/constants/AppConstants`

### fieldName
A string that will be used for `name` and to create `id` and other field references.

### hint (optional)
An optional string

### label
A string that will be shown as the question/label text for the field

----
