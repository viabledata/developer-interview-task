const apiVersion = 'v1';
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000';

// eslint-disable-next-line import/prefer-default-export
export const apiUrl = `${apiBaseUrl}/${apiVersion}`;
