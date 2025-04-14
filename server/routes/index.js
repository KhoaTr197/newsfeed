const router = require('express').Router();

//html pages route
router.use('/', require('./pages'))

//protected routes
// router.use('/api', require('./protected'))

module.exports = router;