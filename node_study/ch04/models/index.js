const Sequelize = require('sequelize')
const dotenv = require('dotenv')

const User = require('./user')
const Comment = require('./comment')
const Country = require('./country')
const Capital = require('./capital')
const Hashtag = require('./hashtag')
const Post = require('./post')

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

//User모델과 Comment모델을 db객체에 추가
db.User = User
db.Comment = Comment
db.Country = Country
db.Capital = Capital
db.Hashtag = Hashtag
db.Post = Post

//모델을 초기화하고 데이터베이스와 연결
User.init(sequelize)
Comment.init(sequelize)
Country.init(sequelize)
Capital.init(sequelize)
Hashtag.init(sequelize)
Post.init(sequelize)

//모델간의 관계설정(예-외래키,연관 테이블 등)
User.associate(db)
Comment.associate(db)
Country.associate(db)
Capital.associate(db)
Hashtag.associate(db)
Post.associate(db)

module.exports = db
