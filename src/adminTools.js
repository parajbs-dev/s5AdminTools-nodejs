const axios = require("axios");

const { makeUrl } = require("s5-utils-nodejs");

const { createConfig } = require("./createConfig.js");
const {
  addAccount,
  getAccounts,
  getAccountsFull,
  enableAccount,
  disableAccount,
  generateNewAuthToken,
} = require("./accounts.js");

class S5AdminTools {
  /**
   * The S5AdminTools which can be used to access S5-net.
   * @constructor
   * @param {string} [portalUrl="https://localhost:5522"] - The portal URL to use to access S5-net, if specified. To use the default portal while passing custom options, use "".
   * @param {Object} [customOptions={}] - Configuration for the client.
   * @param {string} [customOptions.APIKey] - Authentication password to use.
   * @param {string} [customOptions.s5ApiKey] - Authentication API key to use for a S5 portal (sets the "S5-Api-Key" header).
   * @param {string} [customCookie=""] - Custom cookie header to set.
   * @param {string} [customOptions.customUserAgent=""] - Custom user agent header to set.
   * @param {Function} [customOptions.onUploadProgress] - Optional callback to track progress.
   */
  constructor(portalUrl, customOptions = {}) {
    // Check if portal URL provided twice.

    if (portalUrl && customOptions.portalUrl) {
      throw new Error(
        "Both 'portalUrl' parameter provided and 'customOptions.portalUrl' provided. Please pass only one in order to avoid conflicts."
      );
    }

    // Add portal URL to options if given.

    this.customOptions = { ...customOptions };
    // If portal was not given, the default portal URL will be used.
    if (portalUrl) {
      // Set the portalUrl if given.
      this.customOptions.portalUrl = portalUrl;
    }

    // Accounts
    this.accounts = {
      addAccount: addAccount.bind(this),
      getAccounts: getAccounts.bind(this),
      getAccountsFull: getAccountsFull.bind(this),
      enableAccount: enableAccount.bind(this),
      disableAccount: disableAccount.bind(this),
      generateNewAuthToken: generateNewAuthToken.bind(this),
    };

    // Config.toml
    this.config = {
      createConfig: createConfig.bind(this),
    };
  }

  /**
   * Creates and executes a request.
   * @param {Object} config - Configuration for the request. See docs for constructor for the full list of options.
   */
  executeRequest(config) {
    let url = config.url;

    if (!url) {
      let url1 = makeUrl(config.portalUrl, config.endpointPath, config.extraPath ? config.extraPath : "");
      url = `${url1}${config.authToken ? `?auth_token=${config.authToken}` : ""}`;
    }

    // Build headers.
    const headers = buildRequestHeaders(config.headers, config.customUserAgent, config.customCookie, config.s5ApiKey);

    return axios({
      url,
      method: config.method,
      data: config.data,
      params: config.params,
      headers,
      auth: config.APIKey && { username: "", password: config.APIKey },
      responseType: config.responseType,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  }
}

/**
 * Helper function that builds the request headers.
 *
 * @param [baseHeaders] - Any base headers.
 * @param [customUserAgent] - A custom user agent to set.
 * @param [customCookie] - A custom cookie.
 * @param [s5ApiKey] - Authentication key to use for a S5 portal.
 * @returns - The built headers.
 */
function buildRequestHeaders(baseHeaders, customUserAgent, customCookie, s5ApiKey) {
  const returnHeaders = { ...baseHeaders };
  // Set some headers from common options.
  if (customUserAgent) {
    returnHeaders["User-Agent"] = customUserAgent;
  }
  if (customCookie) {
    returnHeaders["Cookie"] = customCookie;
  }
  if (s5ApiKey) {
    returnHeaders["S5-Api-Key"] = s5ApiKey;
  }
  return returnHeaders;
}

// Export the client.

module.exports = { S5AdminTools, buildRequestHeaders };
