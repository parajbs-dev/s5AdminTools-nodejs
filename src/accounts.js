"use strict";

const {
  DEFAULT_ACCOUNTS_OPTIONS,
  DEFAULT_ACCOUNTS_FULL_OPTIONS,
  DEFAULT_ACCOUNTS_RESTRICTED_STATUS_OPTIONS,
  DEFAULT_ACCOUNTS_NEW_AUTH_TOKEN_OPTIONS,
} = require("./defaults");

/**
 * Adds an account to S5 Portal using the provided email and options.
 *
 * @param {string} email - The email address for the account.
 * @param {Object} customOptions - Custom options to override the default account options.
 * @returns {Promise<string>} - A promise that resolves to the response message.
 */
const addAccount = async function (email, customOptions = {}) {
  const opts = { ...DEFAULT_ACCOUNTS_OPTIONS, ...this.customOptions, ...customOptions };

  let responseMessage;

  try {
    const params = { email };
    params.email = email;

    const adminAPIKey = opts.adminAPIKey;

    const response = await this.executeRequest({
      ...opts,
      method: "post",
      headers: {
        Authorization: "Bearer " + adminAPIKey,
        Origin: opts.portalUrl,
      },
      params,
    });

    if (response.status === 200) {
      responseMessage = response.data;
    } else {
      responseMessage = "failed";
    }

    return responseMessage;
  } catch (e) {
    console.log("\n" + e.message + "\n");
    if (e.response && e.response.data) {
      console.log(e.response.data);
    }
    return (responseMessage = "failed");
  }
};

/**
 * Asynchronous function to get accounts.
 *
 * @param {Object} customOptions - Custom options to customize the behavior of the function.
 * @returns {Promise} - A promise that resolves to the response message.
 */
const getAccounts = async function (customOptions = {}) {
  const opts = { ...DEFAULT_ACCOUNTS_OPTIONS, ...this.customOptions, ...customOptions };

  let responseMessage;

  try {
    const adminAPIKey = opts.adminAPIKey;

    const response = await this.executeRequest({
      ...opts,
      method: "get",
      headers: {
        Authorization: "Bearer " + adminAPIKey,
        Origin: opts.portalUrl,
      },
    });

    if (response.status === 200) {
      responseMessage = response.data;
    } else {
      responseMessage = "failed";
    }

    return responseMessage;
  } catch (e) {
    console.log("\n" + e.message + "\n");
    if (e.response && e.response.data) {
      console.log(e.response.data);
    }
    return (responseMessage = "failed");
  }
};

/**
 * Retrieves accounts with full details.
 *
 * @param {Object} customOptions - Custom options to override the default options.
 * @returns {Promise} A promise that resolves with the response data or 'failed' string if an error occurs.
 */
const getAccountsFull = async function (customOptions = {}) {
  // Merge default options, instance-specific options, and custom options
  const opts = { ...DEFAULT_ACCOUNTS_FULL_OPTIONS, ...this.customOptions, ...customOptions };

  let responseMessage;

  try {
    const adminAPIKey = opts.adminAPIKey;

    // Execute a GET request with the provided options
    const response = await this.executeRequest({
      ...opts,
      method: "get",
      headers: {
        Authorization: "Bearer " + adminAPIKey,
        Origin: opts.portalUrl,
      },
    });

    console.log("response.data:  " + response.data);

    if (response.status === 200) {
      responseMessage = response.data;
    } else {
      responseMessage = "failed";
    }

    return responseMessage;
  } catch (e) {
    console.log("\n" + e.message + "\n");
    if (e.response && e.response.data) {
      console.log(e.response.data);
    }
    return (responseMessage = "failed");
  }
};

/**
 * Enables an account with the specified ID.
 *
 * @param {string} id - The ID of the account to enable.
 * @param {Object} customOptions - Custom options for the API request (optional).
 * @returns {Promise<string>} - A Promise that resolves to the response message from the API.
 */
const enableAccount = async function (id, customOptions = {}) {
  // Merge default options, custom options, and instance options
  const opts = { ...DEFAULT_ACCOUNTS_RESTRICTED_STATUS_OPTIONS, ...this.customOptions, ...customOptions };

  let responseMessage;

  try {
    const params = { id };
    params.id = id;
    params.status = "false";

    const adminAPIKey = opts.adminAPIKey;

    // Execute API request
    const response = await this.executeRequest({
      ...opts,
      method: "post",
      headers: {
        Authorization: "Bearer " + adminAPIKey,
        Origin: opts.portalUrl,
      },
      params,
    });

    if (response.status === 200) {
      responseMessage = response.data;
    } else {
      responseMessage = "failed";
    }

    return responseMessage;
  } catch (e) {
    console.log("\n" + e.message + "\n");
    if (e.response && e.response.data) {
      console.log(e.response.data);
    }
    return (responseMessage = "failed");
  }
};

/**
 * Disables an account with the specified ID.
 *
 * @param {number} id - The ID of the account to disable.
 * @param {Object} customOptions - Custom options for the disable operation.
 * @returns {Promise<string>} A promise that resolves to the response message.
 */
const disableAccount = async function (id, customOptions = {}) {
  const opts = { ...DEFAULT_ACCOUNTS_RESTRICTED_STATUS_OPTIONS, ...this.customOptions, ...customOptions };

  let responseMessage;

  try {
    const params = { id };
    params.id = id;
    params.status = "true";

    const adminAPIKey = opts.adminAPIKey;

    const response = await this.executeRequest({
      ...opts,
      method: "post",
      headers: {
        Authorization: "Bearer " + adminAPIKey,
        Origin: opts.portalUrl,
      },
      params,
    });

    if (response.status === 200) {
      responseMessage = response.data;
    } else {
      responseMessage = "failed";
    }

    return responseMessage;
  } catch (e) {
    console.log("\n" + e.message + "\n");
    if (e.response && e.response.data) {
      console.log(e.response.data);
    }
    return (responseMessage = "failed");
  }
};

/**
 * Generate a new authentication token asynchronously.
 *
 * @param {string} id - The ID parameter for the token generation.
 * @param {object} customOptions - Optional custom options for token generation.
 * @returns {Promise<string>} - A promise that resolves to the response message.
 */
const generateNewAuthToken = async function (id, customOptions = {}) {
  const opts = { ...DEFAULT_ACCOUNTS_NEW_AUTH_TOKEN_OPTIONS, ...this.customOptions, ...customOptions };

  let responseMessage;

  try {
    const params = { id };
    params.id = id;

    const adminAPIKey = opts.adminAPIKey;

    const response = await this.executeRequest({
      ...opts,
      method: "post",
      headers: {
        Authorization: "Bearer " + adminAPIKey,
        Origin: opts.portalUrl,
      },
      params,
    });

    if (response.status === 200) {
      responseMessage = response.data;
    } else {
      responseMessage = "failed";
    }

    return responseMessage;
  } catch (e) {
    console.log("\n" + e.message + "\n");
    if (e.response && e.response.data) {
      console.log(e.response.data);
    }
    return (responseMessage = "failed");
  }
};

module.exports = { addAccount, getAccounts, getAccountsFull, enableAccount, disableAccount, generateNewAuthToken };
