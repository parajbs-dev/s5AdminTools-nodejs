/**
 * Demo script for test funktion "enableAccount".
 *
 * Example for "enableAccount" usage: node scripts/enableAccount.js "2"
 *
 * Example with default data: node scripts/enableAccount.js
 *
 */

(async () => {
  const { S5AdminTools } = require("..");
  const { CUSTOM_PORTAL_URL, COSTOM_PORTAL_ADMIN_API_KEY } = require("../config");

  const client = new S5AdminTools("", { portalUrl: CUSTOM_PORTAL_URL, adminAPIKey: COSTOM_PORTAL_ADMIN_API_KEY });

  const defaultId = "12";
  let usedId;

  if (process.argv[2] === null || process.argv[2] === undefined) {
    usedId = defaultId;
    console.log("\n\nusedId =  " + usedId);
  } else {
    usedId = process.argv[2];
    console.log("usedId =  " + usedId);
  }

  // 1. use enableAccount to enable a account on S5-node.
  async function enableAccount(id) {
    await client.accounts
      .enableAccount(id)
      .then(() => {
        console.log("\nAccount enabled successful");
      })
      .catch((err) => {
        console.log("\nAccount enabled failed");
        console.log("\nError: ", err.response.data);
      });
  }

  enableAccount(usedId);
})();
