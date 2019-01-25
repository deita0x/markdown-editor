'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentSchema extends Schema {
  up () {
    this.create('documents', (table) => {
      table.increments()
      table.string('title').defaultTo('')
      table.text('content').defaultTo('')
      table.timestamps()
    })
  }

  down () {
    this.drop('documents')
  }
}

module.exports = DocumentSchema
