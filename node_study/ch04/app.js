const express = require('express')
const morgan = require('morgan')
const path = require('path')
const { sequelize } = require('./models')
require('dotenv').config()

//라우터 모듈 불러오기
const indexRouter = require('./routes') //인덱스는 생략가넝
const usersRouter = require('./routes/users')
const commentRouter = require('./routes/comment')

const app = express()
app.set('port', process.env.PORT || 3000)

//데이터 베이스 연결 설정
sequelize
   .sync({ force: false }) // 기존 테이블을 초기화 할지여부 -> 초기화 X
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(`데이터베이스 연결 실패: ${err}`)
   })

//공통 미들웨어 설정
app.use(morgan('dev')) //로그기록
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//라우터 연결
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/comments', commentRouter)

//에러처리 미들웨어
//경로를 잘못 찾았을때(요청경로에 해당하는 라우터가 없을때)
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error) //다음 에러처리 미들웨어로 이동
})

//모든 에러처리
app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버에러'

   res.status(status).send(
      `<h1>Error ${status}</h1>
      <p>${message}</p>`
   )
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
