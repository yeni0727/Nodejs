const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname))

//4.body-parser 미들웨어:req객체를 json객체로 받아오도록 해줌
app.use(express.json())
//form태그에서 입력한 데이터를 'name=하서&age=50' 이런 형태로 전송
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   //html페이지를 res
   res.sendFile(path.join(__dirname, '/submit.html'))
})

app.post('/submit', (req, res) => {
   // request, response 할때는 header + body 형태로 데이터가 전송된다.
   // header영역: request, response 정보가 들어있음
   // body 영역: 데이터가 들어있음
   console.log(req.body) // form 태그에서 입력한 데이터가 들어있음
   console.log(req.headers)
   console.log(req.body) //form태그에서 입력한 데이터 출력
   res.send('데이터 수신 완료!')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
