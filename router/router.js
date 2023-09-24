const { Router } = require('express');
const controllers = require('../controllers/controllers');


const router = Router();

router.get('/',controllers.signin_get);
router.get('/signup',controllers.signup_get);
router.post('/signin',controllers.signin_post);
router.post('/signup',controllers.signup_post);

module.exports = router;