const knex = require('knex')(require('../knexfile'));

const adminList = (_req, res) => {
    knex('users')
    .select('users.*')
    .orderBy('id')
    .then((data) =>{
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(400).send(`Error retrieving Admin list: ${err}`)
    );

};

const addAdminUser = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .send("Please provide all the required data");
    }

    knex('users')
        .insert(req.body)
        .then((result) => {
            return knex("users")
                .where({ id: result[0] })
        })
        .then((createdAdmin) => {
            res.status(201).json(createdAdmin);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new admin user" });
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
        .then((adminUser) => {

            if (adminUser.length === 0) {
                return res
                    .status(404)
                    .json({ message: `admin User with ID: ${req.params.id} not found` });
            }

            const adminData= adminUser[0];

            res.status(200).json(adminData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve admin for item with Id: ${req.params.id}`,
            });
        });
}

const deleteAdminUser = (req, res) => {
    knex("users")
        .where({ id: req.params.id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res
                    .status(404)
                    .json({ message: `Admin User with ID: ${req.params.id} not found` });
            }

            res.status(200).json({ message: `Admin User with ID: ${req.params.id} deleted` });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to delete Admin User with Id: ${req.params.id}`,
            });
        });
}

module.exports = {
    adminList,
    addAdminUser,
    findOne,
    update,
    deleteAdminUser
};