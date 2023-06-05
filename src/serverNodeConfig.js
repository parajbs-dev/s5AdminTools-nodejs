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
 * Processes the server configuration.
 *
 * @returns {string} The formatted configuration string.
 */
function processServerConfig() {
  // Access and process each section and its values
  const name = promptWithDefault("\nEnter the node name: ", "my-s5-node");

  const keypairSeed = promptWithDefault("\nEnter the keypair seed: ", generateSeed(43));

  const cachePath = promptWithDefault("\nEnter the cache path: ", "tmp/s5/cache");

  const cacheMaxSizeInGB = promptWithDefault("\nEnter the cache max size in GB: ", 4);

  const databasePath = promptWithDefault("\nEnter the database path: ", "data/hive");

  const httpApiPort = promptWithDefault("\nEnter the HTTP API port: ", 5522);

  const httpApiDomain = promptWithDefault("\nEnter the HTTP API domain: ", "localhost");

  const initialPeersInput = promptWithDefault(
    "\nEnter the initial peers (comma-separated): ",
    "wss://z2DWuWNZcdSyZLpXFK2uCU3haaWMXrDAgxzv17sDEMHstZb@s5.garden/s5/p2p,wss://z2DWuPbL5pweybXnEB618pMnV58ECj2VPDNfVGm3tFqBvjF@s5.ninja/s5/p2p"
  );
  const initialPeers = initialPeersInput.split(",");

  const storeType = promptWithDefault("\nSelect the store type (ipfs/local/pixeldrain/s3/sia/webdav): ", "ipfs");

  let storeConfig;
  let exposeStore;
  let deleteApiEnabled;
  switch (storeType) {
    case "ipfs": {
      const gatewayUrl = promptWithDefault("\nEnter the Ipfs Gateway URL: ", "http://localhost:8080");
      const apiUrl = promptWithDefault("\nEnter the Ipfs Api URL: ", "http://localhost:5001");
      const apiAuthorizationHeader = promptWithDefault(
        "\nEnter the Ipfs Api Authorization Header: ",
        "Basic czV1c2VyOnRlc3Q="
      );
      exposeStore = promptWithDefault("\nExpose the store? (true/false): ", false);
      deleteApiEnabled = promptWithDefault("\nIs the delete API enabled? (true/false): ", false);
      storeConfig = `\n[store.ipfs]\ngatewayUrl = "${gatewayUrl}"\napiUrl = "${apiUrl}"\napiAuthorizationHeader = "${apiAuthorizationHeader}"\n\n[store]\nexposeStore = "${exposeStore}"\n\n[http.api.delete]\ndeleteApiEnabled = "${deleteApiEnabled}"`;
      break;
    }
    case "local": {
      const localStorePath = promptWithDefault("\nEnter the local store path: ", "data/store");
      const localStoreHttpBind = promptWithDefault("\nEnter the local store HTTP bind address: ", "127.0.0.1");
      const localStoreHttpPort = promptWithDefault("\nEnter the local store HTTP port: ", 8989);
      const localStoreHttpUrl = promptWithDefault("\nEnter the local store HTTP URL: ", "http://localhost:8989");
      exposeStore = promptWithDefault("\nExpose the store? (true/false): ", false);
      deleteApiEnabled = promptWithDefault("\nIs the delete API enabled? (true/false): ", false);
      storeConfig = `\n[store.local]\npath = "${localStorePath}"\n\n[store.local.http]\nbind = "${localStoreHttpBind}"\nport = ${localStoreHttpPort}\nurl = "${localStoreHttpUrl}"\n\n[store]\nexposeStore = "${exposeStore}"\n\n[http.api.delete]\ndeleteApiEnabled = "${deleteApiEnabled}"`;
      break;
    }
    case "pixeldrain": {
      const apiKey = promptWithDefault("\nEnter the Pixeldrain Api Key: ", "pixeldrain-api-key");
      exposeStore = promptWithDefault("\nExpose the store? (true/false): ", false);
      deleteApiEnabled = promptWithDefault("\nIs the delete API enabled? (true/false): ", false);
      storeConfig = `\n[store.pixeldrain]\napiKey = "${apiKey}"\n\n[store]\nexposeStore = "${exposeStore}"\n\n[http.api.delete]\ndeleteApiEnabled = "${deleteApiEnabled}"`;
      break;
    }
    case "s3": {
      const s3AccessKeyId = promptWithDefault("\nEnter the S3 access key: ", "YOUR_ACCESS_KEY");
      const s3Bucket = promptWithDefault("\nEnter the S3 bucket: ", "YOUR_BUCKET_NAME");
      const s3Endpoint = promptWithDefault("\nEnter the S3 Endpoint: ", "YOUR_S3_ENDPOINT");
      const s3SecretAccessKey = promptWithDefault("\nEnter the S3 secret access key: ", "YOUR_SECRET_KEY");
      exposeStore = promptWithDefault("\nExpose the store? (true/false): ", false);
      deleteApiEnabled = promptWithDefault("\nIs the delete API enabled? (true/false): ", false);
      storeConfig = `\n[store.s3]\naccessKeyId = "${s3AccessKeyId}\nbucket = "${s3Bucket}"\nendpoint = "${s3Endpoint}"\nsecretAccessKey = "${s3SecretAccessKey}"\n\n[store]\nexposeStore = "${exposeStore}"\n\n[http.api.delete]\ndeleteApiEnabled = "${deleteApiEnabled}"`;
      break;
    }
    case "sia": {
      const workerApiUrl = promptWithDefault("\nEnter the Sia worker Api Url: ", "http://localhost:9980/api/worker");
      const siaPassword = promptWithDefault("\nEnter the Sia Api password: ", "sia-api-password");
      const downloadUrl = promptWithDefault("\nEnter the Sia Download Url: ", "https://dl.YOUR.DOMAIN");
      exposeStore = promptWithDefault("\nExpose the store? (true/false): ", false);
      deleteApiEnabled = promptWithDefault("\nIs the delete API enabled? (true/false): ", false);
      storeConfig = `\n[store.sia]\nworkerApiUrl = "${workerApiUrl}"\npassword = "${siaPassword}"\ndownloadUrl = "${downloadUrl}"\n\n[store]\nexposeStore = "${exposeStore}"\n\n[http.api.delete]\ndeleteApiEnabled = "${deleteApiEnabled}"`;
      break;
    }
    case "webdav": {
      const baseUrl = promptWithDefault("\nEnter the WebDAV base URL: ", "https://webdav.example.com/webdav/user");
      const webdavUsername = promptWithDefault("\nEnter the WebDAV username: ", "webdav-username");
      const webdavPassword = promptWithDefault("\nEnter the WebDAV password: ", "webdav-password");
      const publicUrl = promptWithDefault("\nEnter the WebDAV public URL: ", "https://webdav.example.com/public");
      exposeStore = promptWithDefault("\nExpose the store? (true/false): ", false);
      deleteApiEnabled = promptWithDefault("\nIs the delete API enabled? (true/false): ", false);
      storeConfig = `\n[store.webdav]\nbaseUrl = "${baseUrl}"\nusername = "${webdavUsername}"\npassword = "${webdavPassword}"\npublicUrl = "${publicUrl}"\n\n[store]\nexposeStore = "${exposeStore}"\n\n[http.api.delete]\ndeleteApiEnabled = "${deleteApiEnabled}"`;
      break;
    }
    default: {
      storeConfig = ``;
      break;
    }
  }

  const accountsEnabled = promptWithDefault("\nAre accounts enabled? (true/false): ", "true");
  let accountsEnabledConfig;
  switch (accountsEnabled) {
    case "true": {
      const accountsDatabasePath = promptWithDefault("\nEnter the accounts database path: ", "data/accounts");
      const alwaysAllowedScopesInput = promptWithDefault(
        "\nEnter the always allowed scopes (comma-separated): ",
        "s5/subdomain/load,account/login,account/register,s5/registry/read,s5/metadata,s5/debug/storage_locations,s5/debug/download_urls,s5/blob/redirect"
      );
      const alwaysAllowedScopes = alwaysAllowedScopesInput.split(",");
      const adminApiEnabled = promptWithDefault("\nIs the admin API enabled? (true/false): ", false);
      accountsEnabledConfig = `\n[accounts]\nenabled = "true"\nalwaysAllowedScopes = [\n  ${alwaysAllowedScopes
        .map((scope) => `'${scope.trim()}'`)
        .join(
          ",\n  "
        )},\n]\n\n[accounts.database]\npath = "${accountsDatabasePath}"\n\n[http.api.admin]\nenabled = "${adminApiEnabled}"`;
      break;
    }
    case "false": {
      accountsEnabledConfig = ``;
      break;
    }
  }

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
  ${initialPeers.map((peer) => `'${peer.trim()}'`).join(",\n  ")},
]
${storeConfig}
${accountsEnabledConfig}
`;
}

module.exports = { processServerConfig };
