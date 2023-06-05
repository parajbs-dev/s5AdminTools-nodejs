const readlineSync = require("readline-sync");

/**
 * Prompts the user for input and returns the entered value or a default value if no input is provided.
 *
 * @param {string} question - The prompt message to display to the user.
 * @param {string} defaultValue - The default value to use if no input is provided.
 * @returns {Promise<string>} A promise that resolves to the user's input or the default value.
 */
function promptWithDefault(question, defaultValue) {
  const input = readlineSync.question(`${question} (${defaultValue}): `);
  if (input.trim() === "") {
    return defaultValue;
  }
  return input;
}

/**
 * Generates a seed for the keypair.
 *
 * @param {number} length - The length of the seed to generate.
 * @returns {string} The generated seed.
 */
function generateSeed(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let seed = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    seed += characters.charAt(randomIndex);
  }
  return seed;
}

/**
 * Processes the client configuration.
 *
 * @returns {string} The formatted configuration string.
 */
function processClientConfig() {
  // Access and process each section and its values
  const name = promptWithDefault("\nEnter the node name: ", "my-s5-node");

  const keypairSeed = promptWithDefault("\nEnter the keypair seed: ", generateSeed(43));

  const cachePath = promptWithDefault("\nEnter the cache path: ", "tmp/s5/cache");

  const cacheMaxSizeInGB = promptWithDefault("\nEnter the cache max size in GB: ", "4");

  const databasePath = promptWithDefault("\nEnter the database path: ", "data/hive");

  const httpApiPort = promptWithDefault("\nEnter the HTTP API port: ", "5522");

  const httpApiDomain = promptWithDefault("\nEnter the HTTP API domain: ", "localhost");

  const initialPeersInput = promptWithDefault(
    "\nEnter the initial peers (comma-separated): ",
    "wss://z2DWuWNZcdSyZLpXFK2uCU3haaWMXrDAgxzv17sDEMHstZb@s5.garden/s5/p2p,wss://z2DWuPbL5pweybXnEB618pMnV58ECj2VPDNfVGm3tFqBvjF@s5.ninja/s5/p2p"
  );
  const initialPeers = initialPeersInput.split(",");

  // Return the processed values as a formatted string
  return `# ! Documentation: https://docs.sfive.net/install/config\n
name = "${name}"

[keypair]
seed = "${keypairSeed}"

[cache]
path = "${cachePath}"
maxSizeInGB = ${cacheMaxSizeInGB}

[database]
path = "${databasePath}"

[http.api]
port = ${httpApiPort}
domain = "${httpApiDomain}"

[p2p.peers]
initial = [
  ${initialPeers.map((peer) => `'${peer.trim()}'`).join(",\n  ")}
]
`;
}

module.exports = { processClientConfig };
