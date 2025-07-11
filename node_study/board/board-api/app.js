const express = require('express')
const path = require('path')
const { sequelize } = require('./models')
require('dotenv').config()
const cors = require('cors')

//라우터 모듈 불러오기

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) //정적

//데이터베이스 연결 및 서버 시작
sequelize
   .authenticate()
   .then(() => {
      console.log('데이터베이스  연결 성공')
      return sequelize.sync({ force: false })
   })
   .then(() => {
      app.listen(app.get('port'), () => {
         console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
      })
   })
   .catch((err) => {
      console.error(' 데이터베이스 연결 실패:', err)
   })

//공통 미들웨어 설정

//라우터 연결

//에러처리 미들웨어
