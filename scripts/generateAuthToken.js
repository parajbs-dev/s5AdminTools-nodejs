/**
 * Demo script for test funktion "generateAuthToken".
 *
 * Example for "generateAuthToken" usage: node scripts/generateAuthToken.js "2"
 *
 * Example with default data: node scripts/generateAuthToken.js
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

  // 1. use generateAuthToken to generate aAuth Token for a user on S5-node.
  async function generateAuthToken(id) {
    await client.accounts
      .generateNewAuthToken(id)
      .then((response) => {
        console.log("\nAuth Token = " + response.auth_token);
      })
      .catch((err) => {
        console.log("\nAccount adding failed");
        console.log("\nError: ", err.response.data);
      });
  }

  generateAuthToken(usedId);
})();
