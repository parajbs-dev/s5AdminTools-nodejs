/**
 * Demo script for test funktion "disableAccount".
 *
 * Example for "disableAccount" usage: node scripts/disableAccount.js "2"
 *
 * Example with default data: node scripts/disableAccount.js
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

  // 1. use disableAccount to disable a account on S5-node.
  async function disableAccount(id) {
    await client.accounts
      .disableAccount(id)
      .then(() => {
        console.log("\nAccount disabled successful");
      })
      .catch((err) => {
        console.log("\nAccount disabled failed");
        console.log("\nError: ", err.response.data);
      });
  }

  disableAccount(usedId);
})();
