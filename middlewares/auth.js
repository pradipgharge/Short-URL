const { getUser } = require("../service/auth");

async function restrictToLoggedInUsers(req, res, next) {
  const userUid = req.cookies.uid;

  //if user is not logged in
  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);

  //if user is coming with id, check if user exists in db or not
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUsers, checkAuth };
