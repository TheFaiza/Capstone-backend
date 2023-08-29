/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('student_grade', (table) => {
    table.increments('id').primary();
    table
      .integer('student_id')
      .unsigned()
      .references('user.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('course_id')
      .unsigned()
      .references('course.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('grade_id')
      .unsigned()
      .references('grade.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');  
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('student_grade');
};
