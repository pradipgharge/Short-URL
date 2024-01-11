const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  });
  if (!user) {
    return res.render("login", { error: "Invalid username or password" });
  }

  const token = setUser(user);
  return res.json({ token: token });
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
