const knex = require('knex')(require('../knexfile'));

const getStudentGradeList = (req, res) => {
    knex("student_grade")
        .select ("student_grade.*", "users.name as student_name", "course.name as course_name", "course.code as course_code", "grade.name as student_grade")
        .join('users', 'users.id', '=', 'student_grade.student_id')
        .join('course', 'course.id', '=', 'student_grade.course_id')
        .join('grade', 'grade.id', '=', 'student_grade.grade_id')
        .then((gradeResults) => {

            if (gradeResults.length === 0) {
                return res
                    .status(404)
                    .json({ message: `grade with ID: ${req.params.id} not found` });
            }

            const gradeData= gradeResults;

            res.status(200).json(gradeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve grade with Id: ${req.params.id}`,
            });
        });
}


const getStudentGradeListById = (req, res) => {
    knex("student_grade")
        .select ("student_grade.*", "users.name as student_name", "course.name as course_name", "course.code as course_code", "grade.name as student_grade")
        .join('users', 'users.id', '=', 'student_grade.student_id')
        .join('course', 'course.id', '=', 'student_grade.course_id')
        .join('grade', 'grade.id', '=', 'student_grade.grade_id')
        .where({ student_id: req.params.id })
        .then((gradeResults) => {

            if (gradeResults.length === 0) {
                return res
                    .status(404)
                    .json({ message: `grade with ID: ${req.params.id} not found` });
            }

            const gradeData= gradeResults;

            res.status(200).json(gradeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve grade with Id: ${req.params.id}`,
            });
        });
}

const addStudentGrade = (req, res) => {
    if (!req.body.student_id || !req.body.course_id || !req.body.grade_id) {
        return res
            .status(400)
            .send("Please provide all the required data");
    }

    knex('student_grade')
        .insert(req.body)
        .then((createdStudent) => {
            res.status(201).json(createdStudent);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new student user" });
        })

}
const update = (req, res) => {
    knex("users")
      .where({ id: req.params.id })
      .update(req.body)
      .then(() => {
        return knex("users").where({
          id: req.params.id,
        });
      })
      .then((updatedUser) => {
        res.json(updatedUser[0]);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: `Unable to update admin with ID: ${req.params.id}` });
      });
  };

const findOne = (req, res) => {
    knex("users")
        .select ("users.*")
        .where({ 'users.id': req.params.id })
        .then((studentUser) => {

            if (studentUser.length === 0) {
                return res
                    .status(404)
                    .json({ message: `student User with ID: ${req.params.id} not found` });
            }

            const studentData= studentUser[0];

            res.status(200).json(studentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve student with Id: ${req.params.id}`,
            });
        });
}

const deleteStudentGrade = (req, res) => {
    knex("users")
        .where({ id: req.params.id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res
                    .status(404)
                    .json({ message: `Student User with ID: ${req.params.id} not found` });
            }

            res.status(200).json({ message: `Student User with ID: ${req.params.id} deleted` });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to delete Student User with Id: ${req.params.id}`,
            });
        });
}

module.exports = {
    getStudentGradeList,
    getStudentGradeListById,
    addStudentGrade,
    findOne,
    update,
    deleteStudentGrade
};