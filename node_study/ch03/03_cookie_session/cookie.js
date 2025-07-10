const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

//쿠키파서 설정(보안강화를 위해 서명 추가, 서명은 자유롭게 지정)
app.use(cookieParser('my-secret-key'))

app.get('/', (req, res) => {
   res.send('서버가 정상 작동 중입니다.')
})
/*시간 단위
1000 = 1초 (밀리초 단위이므로 1000ms = 1초)
60 = 60초 (1분)
60 = 60분 (1시간)
1000 * 60 * 60 =1시간
*/

//쿠키 만들기
app.get('/set-cookie', (req, res) => {
   //서명된 암호화 진행X
   res.cookie('age', '25', { signed: false, maxAge: 1000 * 60 * 60 })
   //서명된 암호화 진행
   res.cookie('user', 'Alice', { signed: true, maxAge: 1000 * 60 * 60 })
   res.send('서명된 쿠키가 설정되었습니다')
})

//쿠키 읽기
app.get('/get-cookie', (req, res) => {
   console.log('cookie: ', req.cookies) //일반쿠키(서명되지 않은 쿠키)
   console.log('cookie: ', req.signedCookies) //암호화된 쿠키(서명완)

   res.send(`쿠키:${req.cookies.age},서명된 쿠키:${req.signedCookies.user} `)
})

//쿠키 삭제
app.get('/clear-cookie', (req, res) => {
   res.clearCookie('age')
   res.clearCookie('user')
   res.send('쿠키가 삭제되었습니다')
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
