const port = 9000;
const baseURL = `http://localhost:${port}`;
const redirectBase = `http://localhost:3000`;
module.exports = {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: 'mysecret',
  baseURL: baseURL,
  port: port,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: "",
    project_id: "", // The name of your project
    client_secret: "",
    redirect_uris: [
      `${redirectBase}/auth_callback`
    ],
  }
};
