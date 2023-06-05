"use strict";

const { defaultPortalUrl } = require("s5-utils-nodejs");

function defaultOptions(endpointPath) {
  return {
    portalUrl: defaultPortalUrl(),
    endpointPath: endpointPath,

    adminAPIKey: "",
    s5ApiKey: "",
    authToken: "",
    customUserAgent: "",
    onUploadProgress: undefined,
  };
}

const DEFAULT_ACCOUNTS_OPTIONS = {
  ...defaultOptions("/s5/admin/accounts"),
};

const DEFAULT_ACCOUNTS_FULL_OPTIONS = {
  ...defaultOptions("/s5/admin/accounts/full"),
};

const DEFAULT_ACCOUNTS_RESTRICTED_STATUS_OPTIONS = {
  ...defaultOptions("/s5/admin/accounts/set_restricted_status"),
};

const DEFAULT_ACCOUNTS_NEW_AUTH_TOKEN_OPTIONS = {
  ...defaultOptions("/s5/admin/accounts/new_auth_token"),
};

module.exports = {
  defaultOptions,
  DEFAULT_ACCOUNTS_OPTIONS,
  DEFAULT_ACCOUNTS_FULL_OPTIONS,
  DEFAULT_ACCOUNTS_RESTRICTED_STATUS_OPTIONS,
  DEFAULT_ACCOUNTS_NEW_AUTH_TOKEN_OPTIONS,
};
