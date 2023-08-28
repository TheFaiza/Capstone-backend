/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      name: 'Faiza Usman',
      email: 'faiza@gmail.com',
      password: '123456',
      mobile: '+1 1234567890',
      user_type: 'admin',
      address: 'New Canada',
      city: 'Canada',
      country: 'CA',
      profile_pic: '',
      status: 'active',
    },
  ]);
};