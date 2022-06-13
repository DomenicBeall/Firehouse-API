const router = require('express').Router();
const user = require('./users');
const house = require('./houses');

router.use('/user', user);
router.use('/house', house);

module.exports = router;