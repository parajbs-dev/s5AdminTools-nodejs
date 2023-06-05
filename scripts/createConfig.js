/**
 * Demo script for test funktion "createConfig".
 *
 * Example for "createConfig" usage: node scripts/createConfig.js "config.toml"
 *
 * Example with default data: node scripts/createConfig.js
 *
 */

(async () => {
  const { S5AdminTools } = require("..");
  const { CUSTOM_PORTAL_URL, COSTOM_PORTAL_ADMIN_API_KEY } = require("../config");

  const client = new S5AdminTools("", { portalUrl: CUSTOM_PORTAL_URL, adminAPIKey: COSTOM_PORTAL_ADMIN_API_KEY });

  const defaultFileName = "config.toml";
  let usedFileName;

  if (process.argv[2] === null || process.argv[2] === undefined) {
    usedFileName = defaultFileName;
    console.log("\n\nusedFileName =  " + usedFileName);
  } else {
    usedFileName = process.argv[2];
    console.log("usedFileName =  " + usedFileName);
  }

  // 1. use createConfig to create a config for S5-node.
  async function createConfig(FileName) {
    await client.config
      .createConfig(FileName)
      .then((response) => {
        console.log("Config creating " + response);
      })
      .catch((err) => {
        console.log("\nConfig creating failed");
        console.log("\nError: ", err.response.data);
      });
  }

  createConfig(usedFileName);
})();
