const { Router } = require('express');
const router = Router()
//var util=require('./util');

router.use('/', require('./home'));
router.use('/accounts', require('./accounts'));
router.use('/admin', require('./admin'));
router.use('/auth', require('./auth'));
router.use('/products',  require('./products'));
//router.use('/posts', util.getPostQueryString, require('./posts'));

module.exports = router;