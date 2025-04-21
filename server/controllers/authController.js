const formValidator = require('../utils/FormValidator')({
  username: {
    minLength: 3,
    maxLength: 20,
    allowedChars: /^[a-zA-Z0-9_]+$/,
    noSpaces: true,
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    minLength: 3,
    maxLength: 30,
    mustContain: null
  }
});
const auth = require('../middlewares/authMiddleware');
const userService = require('../services/userService');
const logger = require('../middlewares/logger');
// --------------------------------------------

const log = logger();

// Login controller
const login = async (req, res) => {
  const { username, password } = req.body;
  const [ usernameCheckRes, passwordCheckRes ] = [
    formValidator.username(username),
    formValidator.password(password)
  ];

  if (!usernameCheckRes.isValid || !passwordCheckRes.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid username or password!",
      detail: {
        username: usernameCheckRes.message,
        password: passwordCheckRes.message
      }
    });
  }

  const isAdmin = await userService.checkAdmin(username, password);
  const isAuthor = await userService.checkAuthor(username, password);

  if (!isAdmin && !isAuthor) {
    return res.status(401).json({
      success: false,
      message: "Wrong username or password!",
    });
  }

  const token = auth.generateToken({ username, password, role: isAdmin ? "admin" : "author" });

  res.cookie('token', token, {
    httpOnly: true, // Prevents JavaScript access
    sameSite: 'strict', // Prevents cross-site cookie
    maxAge: 3600000 // 1 hour in milliseconds
  });

  res.json({
    success: true,
    token
  });

  log.master(`User ${username} has been logged in!`);
};

// Signup controller
const signup = async (req, res) => {
  const { username, password, email } = req.body;

  // Validate credential
  const [ usernameCheckRes, emailCheckRes, passwordCheckRes ] = [
    formValidator.username(username),
    formValidator.email(email),
    formValidator.password(password)
  ];

  if (!usernameCheckRes.isValid || !emailCheckRes.isValid || !passwordCheckRes.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid username or password!",
      detail: {
      }
    });
  }

  // Add user
  try {
    await userService.addUser(username, password, email, 0, 1);

    res.json({
      success: true,
      message: "User created successfully!"
    });
  
    log.master(`User ${username} has been signed up!`);  
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// Logout controller
const logout = async (req, res) => {
  // Clear cookie
  res.clearCookie('token');
  res.json({
    success: true,
    message: "Logged out successfully!"
  });

  log.master(`An user has been logged out!`);
};

module.exports = {
  login,
  signup,
  logout
};