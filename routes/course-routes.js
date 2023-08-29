const router = require('express').Router();
const courseController = require('../controllers/course-controller');

router.route('/').get(courseController.courseList).post(courseController.addCourse);
router.route('/:id').get(courseController.findOne).patch(courseController.update);
router.route('/:id').delete(courseController.deleteCourse);

module.exports = router;