/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('grade').del();
  await knex('grade').insert([
    {
      id: 1,
      name: 'A+',
      min_val: 90,
      max_val: 100,
    },
    {
      id: 2,
      name: 'A',
      min_val: 80,
      max_val: 89,
    },
    {
      id: 3,
      name: 'B',
      min_val: 70,
      max_val: 79,
    },
    {
      id: 4,
      name: 'C',
      min_val: 60,
      max_val: 69,
    },
    {
      id: 5,
      name: 'D',
      min_val: 50,
      max_val: 59,
    },
    {
      id: 6,
      name: 'F',
      min_val: 0,
      max_val: 49,
    },
  ]);
};