const handleError = payload => ({
  type: 'HANDLE_ERROR',
  payload,
});

const handleUnauthorised = () => ({
  type: 'HANDLE_UNAUTHORISED',
});

const resetErrors = () => ({
  type: 'RESET_ERROR',
});
const log = payload => ({
  type: 'LOG',
  payload,
});


const logSuccess = () => ({
  type: 'LOG_SUCCESS',
});
const logFailure = () => ({
  type: 'LOG_FAILURE',
});
export {
  handleError,
  handleUnauthorised,
  resetErrors,
  log,
  logSuccess,
  logFailure,
};
