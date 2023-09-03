const router = require('express').Router();
const loginController = require('../controllers/login-controller');

router.route('/login').get(loginController.loginUser);
router.route('/logout').post(loginController.logoutUser);
router.route('/:id').get(loginController.findOne);


module.exports = router;