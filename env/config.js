const isProdEnvironment = false; // change to `true` if you are in a production environment

let gitHubCallbackURL = process.env.GITHUB_CLIENT_CALLBACKURL;
let gitHubClientID = process.env.GITHUB_CLIENT_ID;
let gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;

// TODO account for prod values in .env
// if(isDevEnvironment) {
//   gitHubCallbackURL = process.env.GITHUB_CALLBACK_URL_PROD;
//   gitHubClientID = process.env.GITHUB_CLIENT_ID_PROD;
//   gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET_PROD;
// }

module.exports = { gitHubCallbackURL, gitHubClientID, gitHubClientSecret };
