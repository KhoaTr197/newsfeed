const router = require('express').Router();
// -----------------------------------

//api routes
router.use('/api/auth', require('./api/auth'))

//html pages route
router.use('/', require('./pages'))

module.exports = router;