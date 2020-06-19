const BrewsService = {
    getAllBrews(knex) {
        return knex.select('*').from('chicagobrew')
    },
    //creating a method & having it return a promise => adding Brews
    insertBrews(knex, newBrew) {
        //return Promise.resolve({})
     return knex
         .insert(newBrew)
         .into('chicagobrew')
         .returning('*')
         .then(rows => {
             return rows[0]
         })
    }, 
    getById(knex, id) {
        return knex('chicagobrew').select('*').where('id', id).first();
    },
    deleteBrew(knex, id) {
     return knex('chicagobrew')
          .where({ id })
          .delete()
     },
     updateBrew(knex, id, newBrewFields) {
         return knex('chicagobrew')
             .where({ id })
             .update(newBrewFields)
     }
 }
 module.exports = BrewsService