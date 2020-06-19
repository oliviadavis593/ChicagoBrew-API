require('dotenv').config()

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    //refers to folder in our app that contains migration steps 
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DB_URL
        : process.env.DB_URL
}