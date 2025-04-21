const router = require('express').Router();
const formValidator = require('../../utils/FormValidator')();
const auth = require('../../middlewares/authMiddleware');
// -----------------------------------

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [ usernameCheckRes, passwordCheckRes ] = [
    formValidator.username(username),
    formValidator.password(password)
  ];

  if (!usernameCheckRes.isValid || !passwordCheckRes.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid username or password!"
    });
  }

  // TODO: Query Users in DB then get role (for cookie)
  if (username !== "admin" || password !== "@Dmin123456") {
    return res.status(401).json({
      success: false,
      message: "Wrong username or password!"
    });
  }

  const token = auth.generateToken({ username, password, role: "admin" });

  res.cookie('token', token, {
    httpOnly: true, // Prevents JavaScript access
    sameSite: 'strict', // Prevents cross-site cookie
    maxAge: 3600000 // 1 hour in milliseconds
  });

  res.json({
    success: true,
    token
  });
})

router.post("/logout", async (req, res) => {
  console.log("Logging out...")
  res.clearCookie('token');
  res.json({
    success: true,
    message: "Logged out successfully!"
  });
})

module.exports = router;