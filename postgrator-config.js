require('dotenv').config()

module.exports = {
    migrationDirectory: __dirname + '/migrations',
    "driver": "pg",
    //refers to folder in our app that contains migration steps 
    "connectionString": (process.env.NODE_ENV === 'test')
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
}