const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://catcouture.com",
  issuerBaseURL: "https://dev-8r4cuew5h4u0t6ck.us.auth0.com/",
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
