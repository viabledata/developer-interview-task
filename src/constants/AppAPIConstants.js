import { apiUrl } from './Config';

export const API_URL = apiUrl;

// Create account/register
export const REGISTER_ACCOUNT_ENDPOINT = `${apiUrl}/registration`;
export const SIGN_IN_ENDPOINT = `${apiUrl}/sign-in`;
export const SIGN_OUT_ENDPOINT = `${apiUrl}/sign-out`;

// Main
export const THE_ENDPOINT = `${apiUrl}/sample`;

// Responses
export const USER_ALREADY_REGISTERED = 'User is already registered';
export const USER_ALREADY_VERIFIED = 'User already verified, please login';
export const USER_AWAITING_VERIFICATION = 'User is awaiting verification';
export const USER_NOT_REGISTERED = 'User is not registered';
export const USER_NOT_VERIFIED = 'User not verified, please verify registration';
export const USER_SIGN_IN_DETAILS_INVALID = 'Email or password invalid';
