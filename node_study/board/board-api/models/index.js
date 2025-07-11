const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const Member = require('./member')
const Board = require('./board')

const db = {}

const sequelize = new Sequelize(config.database, config.membername, config.password, config)

db.sequelize = sequelize
db.Member = Member
db.Board = Board

Member.init(sequelize)
Board.init(sequelize)

module.exports = db
