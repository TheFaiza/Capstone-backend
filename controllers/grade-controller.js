const knex = require('knex')(require('../knexfile'));

const gradeList = (_req, res) => {
    knex('grade')
    .select('grade.*')
    .orderBy('id')
    .then((data) =>{
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send(`Error retrieving grade list: ${err}`)
    );

};

const addGrade = (req, res) => {
    if (!req.body.name || !req.body.min_val || !req.body.max_val) {
        return res
            .status(400)
            .send("Please provide all the required data");
    }

    knex('grade')
        .insert(req.body)
        .then((result) => {
            return knex("grade")
                .where({ id: result[0] })
        })
        .then((createdGrade) => {
            res.status(201).json(createdGrade);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new grade" });
        })

}
const update = (req, res) => {
    knex("grade")
      .where({ id: req.params.id })
      .update(req.body)
      .then(() => {
        return knex("grade").where({
          id: req.params.id,
        });
      })
      .then((updatedGrade) => {
        res.json(updatedGrade[0]);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: `Unable to update grade with ID: ${req.params.id}` });
      });
  };

const findOne = (req, res) => {
    knex("grade")
        .select ("grade.*")
        .where({ 'grade.id': req.params.id })
        .then((gradeResults) => {

            if (gradeResults.length === 0) {
                return res
                    .status(404)
                    .json({ message: `grade with ID: ${req.params.id} not found` });
            }

            const gradeData= gradeResults[0];

            res.status(200).json(gradeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve grade with Id: ${req.params.id}`,
            });
        });
}

const deleteGrade = (req, res) => {
    knex("grade")
        .where({ id: req.params.id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res
                    .status(404)
                    .json({ message: `grade with ID: ${req.params.id} not found` });
            }

            res.status(200).json({ message: `grade with ID: ${req.params.id} deleted` });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to delete grade with Id: ${req.params.id}`,
            });
        });
}

module.exports = {
    gradeList,
    addGrade,
    findOne,
    update,
    deleteGrade
};