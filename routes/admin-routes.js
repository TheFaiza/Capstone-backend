const router = require('express').Router();
const adminController = require('../controllers/admin-controller');

router.route('/').get(adminController.adminList).post(adminController.addAdminUser);
router.route('/:id').get(adminController.findOne).patch(adminController.update);
router.route('/:id').delete(adminController.deleteAdminUser);


module.exports = router;