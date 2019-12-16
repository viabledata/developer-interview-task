'use strict'

const serviceDeskBaseUrl = 'https://support.cop.homeoffice.gov.uk/servicedesk';
const serviceDeskUrls = {
  feedback: `${serviceDeskBaseUrl}/customer/portal/3/create/54`,
  support: `${serviceDeskBaseUrl}/customer/portal/3`,
};

const config = {
  serviceDesk: serviceDeskUrls,
};

export default config;
