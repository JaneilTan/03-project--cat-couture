const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: `${process.env.AUTH0_AUDIENCE}`,
  issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
