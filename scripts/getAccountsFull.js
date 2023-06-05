/**
 * Demo script for test funktion "getAccountsFull".
 *
 * Example for "getAccountsFull" usage: node scripts/getAccountsFull.js
 *
 */

(async () => {
  const { S5AdminTools } = require("..");
  const { CUSTOM_PORTAL_URL, COSTOM_PORTAL_ADMIN_API_KEY } = require("../config");

  const client = new S5AdminTools("", { portalUrl: CUSTOM_PORTAL_URL, adminAPIKey: COSTOM_PORTAL_ADMIN_API_KEY });

  // 1. use getAccountsFull to get Info all Accounts Full from S5 portal.
  async function getAccountsFull() {
    await client.accounts
      .getAccountsFull()
      .then((response) => {
        console.log("\n" + JSON.stringify(response, null, "  "));
        console.log("\nGetting Accounts Full successful");
      })
      .catch((err) => {
        console.log("\nGetting Accounts Full failed");
        console.log("\nError: ", err.response.data);
      });
  }

  getAccountsFull();
})();
