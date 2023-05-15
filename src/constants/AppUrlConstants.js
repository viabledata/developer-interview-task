// External links
export const HOME_URL = 'https://home/';
export const LANDING_URL = '/';

// Register/Sign in pages
export const REGISTER_ACCOUNT_URL = '/create-account/email-address';
export const REGISTER_EMAIL_URL = '/create-account/email-address';
export const SIGN_IN_URL = '/sign-in';

// Main pages
export const PAGE_ONE_PAGE_NAME = 'Your page one';
export const PAGE_ONE_URL = '/your-page-one';
export const THIS_ITEM_URL = '/your-item';

// Top level pages - we use this to know to clear form session data
export const TOP_LEVEL_PAGES = [
  PAGE_ONE_URL,
];

// Pages without back links
export const NO_BACK_LINKS = [
  ...TOP_LEVEL_PAGES,
  SIGN_IN_URL,
];
