const { json } = require('express');

const knex = require('knex')(require('../knexfile'));

const loginUser = (req, res) => {

    console.log('hello m here --- 0000');

    if (!req.query.email || !req.query.password || !req.query.user_type) {
        return res
            .status(400)
            .send("Please provide all the required data");
    }

    knex("users")
        .select ("users.*")
        .where({ 'users.email': req.query.email, 'users.password': req.query.password, 'users.user_type': req.query.user_type  })
        .then((adminUser) => {

            if (adminUser.length === 0) {
                return res
                    .status(404)
                    .json({ message: `admin User with ID: ${req.query.email} not found` });
            }

            const adminData= adminUser[0];

            
    console.log('adminData --- 2222', JSON.stringify(adminData));

            res.status(200).json(adminData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: `Unable to retrieve admin for item with Id: ${req.params.id}`,
            });
        });

}

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

const logoutUser = (req, res) => {
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

module.exports = {
    loginUser,
    findOne,
    logoutUser
};