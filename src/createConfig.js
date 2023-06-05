const readlineSync = require("readline-sync");
const fs = require("fs");

const { processClientConfig } = require("./clientNodeConfig");
const { processServerConfig } = require("./serverNodeConfig");

/**
 * Asynchronously creates a configuration file based on user input.
 *
 * @param {string} fileName - The name of the configuration file to create.
 * @returns {Promise<string>} A Promise that resolves to a string indicating the result of the configuration creation ("successful" or "canceled").
 */
async function createConfig(fileName) {
  // Prompt the user to choose between server and client config
  const configType = readlineSync.keyInSelect(
    ["Server config.toml", "Client config.toml"],
    "Select config type to create:"
  );

  let processedConfig;

  if (configType === -1) {
    // User canceled the prompt
    console.log("Configuration canceled.");
    return "canceled";
  } else if (configType === 0) {
    // Server config
    processedConfig = processServerConfig();
    fs.writeFileSync(fileName, processedConfig);
    console.log(`\n\nServer Configuration saved to ${fileName}\n`);
    return "successful";
  } else if (configType === 1) {
    // Client config
    processedConfig = processClientConfig();
    fs.writeFileSync(fileName, processedConfig);
    console.log(`\n\nClient Configuration saved to ${fileName}\n`);
    return "successful";
  }
}

module.exports = { createConfig };
