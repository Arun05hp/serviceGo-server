const jwt = require("jsonwebtoken");
const config = require("../keyconfig");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be Logged in" });
  }
  const token = authorization.replace("ServiceGo__21 ", "");

  jwt.verify(token, config.Key_String, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    next();
  });
};
