const router = require('express').Router();
const studentGradeListController = require('../controllers/student-grade-list-controller');

router.route('/').get(studentGradeListController.getStudentGradeList).post(studentGradeListController.addStudentGrade);
router.route('/:id').get(studentGradeListController.findOne).patch(studentGradeListController.update);
router.route('/:id').delete(studentGradeListController.deleteStudentGrade);

module.exports = router;