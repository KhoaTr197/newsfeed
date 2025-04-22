const router = require('express').Router();
// -----------------------------------

//api routes
router.use('/api/auth', require('./api/auth'))
router.use('/api/articles', require('./api/articles'))
router.use("/api/categories", require("./category"));
router.use("/api/contacts", require("./contact"));

//html pages route
router.use("/", require("./pages"));

module.exports = router;
