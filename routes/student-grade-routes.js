const router = require('express').Router();
const studentGradeController = require('../controllers/student-grade-controller');

router.route('/').get(studentGradeController.studentGradeList).post(studentGradeController.addStudentGrade);
router.route('/:id').get(studentGradeController.findOne).patch(studentGradeController.update);
router.route('/:id').delete(studentGradeController.deleteStudentGrade);

module.exports = router;