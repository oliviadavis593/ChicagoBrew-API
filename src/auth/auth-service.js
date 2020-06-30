const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')

const Authservice = {
    getUserWithEmail(db, email) {
        return db('chicagobrew_users')
            .where({ email })
            .first()
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject, 
            algorithm: 'HS256',
            noTimestamp: true
        })
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256']
        })
    },
    parseBasicToken(token) {
        return Buffer
            .from(token, 'base64')
            .toString()
            .split(':')
    }
}

module.exports = Authservice