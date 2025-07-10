const express = require('express')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
   res.send('환영합니다')
})

app.get('/error', (req, res, next) => {
   const err = new Error('에러발생') //강제로 에러발생시킴
   err.status = 500 //http상세 코드
   next(err)
})

//에러처리 미들웨어
app.use((err, req, res, next) => {
   console.error('Error: ', err.message)
   //상태코드와 에러메세지를 json객체로 클라이언트에게 전달
   res.status(err.status).json({
      error: {
         message: err.message,
      },
   })
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
