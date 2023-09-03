const router = require('express').Router();
const studentCourseController = require('../controllers/student-course-controller');

router.route('/').get(studentCourseController.studentCourseList).post(studentCourseController.addStudentCourse);
router.route('/:id').get(studentCourseController.findOne).patch(studentCourseController.update);
router.route('/:id').delete(studentCourseController.deleteStudentCourse);

module.exports = router;