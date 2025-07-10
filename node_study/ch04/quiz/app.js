const express = require('express')
const morgan = require('morgan')
const path = require('path')
const { sequelize } = require('./models')
require('dotenv').config()

//라우터 모듈 불러오기
const indexRouter = require('./routes')
const customersRouter = require('./routes/customers')
const ordersRouter = require('./routes/orders')

const app = express()
app.set('port', process.env.PORT || 3000)

//공통 미들웨어
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//라우터 연결
app.use('/', indexRouter)
app.use('/customers', customersRouter)
app.use('/orders', ordersRouter)

//에러처리 미들웨어
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
   error.status = 404
   next(error)
})

app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버에러'

   res.status(status).send(
      `<h1>Error ${status}</h1>
       <p>${message}</p>`
   )
})

//데이터베이스 연결 및 서버 시작
sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')

      // 서버 시작은 DB 연결 후에
      app.listen(app.get('port'), () => {
         console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
      })
   })
   .catch((err) => {
      console.error(`데이터베이스 연결 실패: ${err}`)
   })
