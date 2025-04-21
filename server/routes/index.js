const router = require("express").Router();

//html pages route
router.use("/", require("./pages"));

router.use("/", require("./category"));

router.use("/", require("./contact"));
//protected routes
// router.use('/api', require('./protected'))

module.exports = router;
