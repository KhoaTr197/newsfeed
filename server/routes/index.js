const router = require('express').Router();
// -----------------------------------

//api routes
router.use('/api/auth', require('./api/auth'));
router.use('/api/authors', require('./api/authors'));
router.use('/api/users', require('./api/users'));
router.use('/api/articles', require('./api/articles'));
router.use('/api/categories', require('./api/categories'));
router.use('/api/contacts', require('./api/contacts'));
router.use('/api/newsletter', require('./api/newsletter'));
router.use('/api/images', require('./api/images'));

//html pages route
router.use('/', require('./pages'))

module.exports = router;
