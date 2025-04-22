const router = require('express').Router();
const userController = require('../../controllers/usersController');
// -----------------------------------

router.get("/", userController.getAllUsers)

router.post("/", userController.addUser)

router.put("/", userController.updateUser)

router.post("/reset", userController.resetPassword)

module.exports = router;