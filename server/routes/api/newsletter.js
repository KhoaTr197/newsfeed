const router = require("express").Router();
const newsletterController = require("../../controllers/newsletterController");

router.get("/", newsletterController.getAllSubscribers);
router.post("/", newsletterController.addSubscriber);

module.exports = router;
