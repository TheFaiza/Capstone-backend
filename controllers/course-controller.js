const knex = require('knex')(require('../knexfile'));

const courseList = (_req, res) => {
    knex('course')
    .select('course.*')
    .orderBy('id')
    .then((data) =>{
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send(`Error retrieving Course list: ${err}`)
    );

};

const addCourse = (req, res) => {
    if (!req.body.name || !req.body.code) {
        return res
            .status(400)
            .send("Please provide all the required data");
    }

    knex('course')
        .insert(req.body)
        .then((result) => {
            return knex("course")
                .where({ id: result[0] })
        })
        .then((createdCourse) => {
            res.status(201).json(createdCourse);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new course" });
        })

}
const update = (req, res) => {
    knex("course")
      .where({ id: req.params.id })
      .update(req.body)
      .then(() => {
        return knex("course").where({
          id: req.params.id,
        });
      })
      .then((updatedCourse) => {
        res.json(updatedCourse[0]);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: `Unable to update course with ID: ${req.params.id}` });
      });
  };

const findOne = (req, res) => {
    knex("course")
        .select ("course.*")
        .where({ 'course.id': req.params.id })
        .then((courseResults) => {

            if (courseResults.length === 0) {
                return res
                    .status(404)
                    .json({ message: `course with ID: ${req.params.id} not found` });
            }

            const courseData= courseResults[0];

            res.status(200).json(courseData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve course with Id: ${req.params.id}`,
            });
        });
}

const deleteCourse = (req, res) => {
    knex("course")
        .where({ id: req.params.id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res
                    .status(404)
                    .json({ message: `course with ID: ${req.params.id} not found` });
            }

            res.status(200).json({ message: `course with ID: ${req.params.id} deleted` });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to delete course with Id: ${req.params.id}`,
            });
        });
}

module.exports = {
    courseList,
    addCourse,
    findOne,
    update,
    deleteCourse
};