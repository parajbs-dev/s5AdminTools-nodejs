/**
 * Demo script for test funktion "getAccounts".
 *
 * Example for "getAccounts" usage: node scripts/getAccounts.js
 *
 * Example with default data: node scripts/getAccounts.js
 *
 */

(async () => {
  const { S5AdminTools } = require("..");
  const { CUSTOM_PORTAL_URL, COSTOM_PORTAL_ADMIN_API_KEY } = require("../config");

  const client = new S5AdminTools("", { portalUrl: CUSTOM_PORTAL_URL, adminAPIKey: COSTOM_PORTAL_ADMIN_API_KEY });

  // 1. use getAccounts to get Info all Accounts from S5 portal.
  async function getAccounts() {
    await client.accounts
      .getAccounts()
      .then((response) => {
        console.log("\n" + JSON.stringify(response, null, "  "));
        console.log("\nGetting Accounts successful");
      })
      .catch((err) => {
        console.log("\nGetting Accounts failed");
        console.log("\nError: ", err.response.data);
      });
  }

  getAccounts();
})();
