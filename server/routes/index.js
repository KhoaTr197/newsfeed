const router = require('express').Router();

//html pages route
router.use('/', require('./pages'))

//static files route
router.use('/', require('./static'))

//protected routes
// router.use('/api', require('./protected'))

module.exports = router;