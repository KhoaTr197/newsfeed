const router = require('express').Router();
const authController = require('../../controllers/authController');
// -----------------------------------

router.post("/login", authController.login)

router.post("/signup", authController.signup)

router.post("/logout", authController.logout)

module.exports = router;