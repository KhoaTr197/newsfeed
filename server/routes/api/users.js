const router = require('express').Router();
const userController = require('../../controllers/usersController');
// -----------------------------------

router.get("/", userController.getAllUsers)

router.get("/:id", userController.getUserById)

router.post("/", userController.addUser)

router.put("/", userController.updateUser)

router.put("/password", userController.updatePassword)

router.post("/reset", userController.resetPassword)

module.exports = router;