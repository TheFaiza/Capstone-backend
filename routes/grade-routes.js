const router = require('express').Router();
const gradeController = require('../controllers/grade-controller');

router.route('/').get(gradeController.gradeList).post(gradeController.addGrade);
router.route('/:id').get(gradeController.findOne).patch(gradeController.update);
router.route('/:id').delete(gradeController.deleteGrade);
// router.route('/studentGrade').get(gradeController.getStudentGrade);

module.exports = router;