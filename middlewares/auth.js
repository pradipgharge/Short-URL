const { getUser } = require("../service/auth");

async function restrictToLoggedInUsers(req, res, next) {
  console.log(req.headers);
  const userUid = req.headers["authorization"];

  //if user is not logged in
  if (!userUid) return res.redirect("/login");

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);

  //if user is coming with id, check if user exists in db or not
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  console.log(req.headers);
  const userUid = req.headers["authorization"];
  const token = userUid.split("Bearer ")[1];

  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUsers, checkAuth };
