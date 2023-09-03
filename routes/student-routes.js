const router = require('express').Router();
const studentController = require('../controllers/student-controller');

router.route('/').get(studentController.studentList).post(studentController.addStudentUser);
router.route('/:id').get(studentController.findOne).patch(studentController.update);
router.route('/:id').delete(studentController.deleteStudentUser);

module.exports = router;