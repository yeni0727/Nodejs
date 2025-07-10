const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const Customer = require('./customer')
const Order = require('./order')

//.env에서 현재 실행환경(development,test,production중 하나)를 가져옴
const env = process.env.NODE_ENV || 'development'

//가져온 실행환경에 맞는 db설정을 가져옴
const config = require('../config/config.json')[env]
const db = {}
dotenv.config()

//sequelize를 사용해서 데이터베이스 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config)

//db객체를 생성하며 sequelize객체와 모든 모델들을 저장
db.sequelize = sequelize

db.Customer = Customer
db.Order = Order

Customer.init(sequelize)
Order.init(sequelize)

Customer.associate(db)
Order.associate(db)

module.exports = db
