/**
 * Demo script for test funktion "addAccount".
 *
 * Example for "addAccount" usage: node scripts/addAccount.js "youremail@example.com"
 *
 * Example with default data: node scripts/addAccount.js
 *
 */

(async () => {
  const { S5AdminTools } = require("..");
  const { CUSTOM_PORTAL_URL, COSTOM_PORTAL_ADMIN_API_KEY } = require("../config");

  const client = new S5AdminTools("", { portalUrl: CUSTOM_PORTAL_URL, adminAPIKey: COSTOM_PORTAL_ADMIN_API_KEY });

  const defaultEmail = "you@example.com";
  let usedEmail;

  if (process.argv[2] === null || process.argv[2] === undefined) {
    usedEmail = defaultEmail;
    console.log("\n\nusedEmail =  " + usedEmail);
  } else {
    usedEmail = process.argv[2];
    console.log("usedEmail =  " + usedEmail);
  }

  // 1. use addAccount to add account to S5 portal.
  async function addAccount(email) {
    await client.accounts
      .addAccount(email)
      .then((response) => {
        console.log("\nAccount Id = " + response.id);
      })
      .catch((err) => {
        console.log("\nAccount adding failed");
        console.log("\nError: ", err.response.data);
      });
  }

  addAccount(usedEmail);
})();
