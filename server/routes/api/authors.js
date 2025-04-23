const router = require('express').Router();
const userController = require('../../controllers/usersController');
// -----------------------------------

router.get("/", userController.getAllAuthors)

router.post("/", userController.addAuthor)

router.put("/", userController.updateAuthor)

router.post("/reset", userController.resetPassword)

module.exports = router;