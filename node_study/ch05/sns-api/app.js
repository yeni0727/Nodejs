const express = require('express')
const path = require('path') // 경로 처리 유틸리티
const cookieParser = require('cookie-parser') // 쿠키 처리 미들웨어
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어
const session = require('express-session') // 세션 관리 미들웨어
require('dotenv').config() // 환경 변수 관리

//라우터 및 기타 모듈 불러오기
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const pageRouter = require('./routes/page')
const userRouter = require('./routes/user')

const app = express()
app.set('port', process.env.PORT || 8002)

//시퀄라이즈를 이용한 DB연결

//미들웨어 설정
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱
app.use(cookieParser(process.env.COOKIE_SECRET)) //쿠키 설정
//세션 설정
app.use(
   session({
      resave: false, //세션 데이터가 변경사항이 없어도 재저장 할지 여부 -> 변경사항이 있어야 재저장
      saveUninitialized: true, //초기화 되지 않은 세션 저장 여부 -> 초기화 되지 않은 빈 세션도 저장
      secret: process.env.COOKIE_SECRET, //세션 암호화 키
      cookie: {
         //maxAge를 설정하지 않으면 브라우저 꺼짐->쿠키 삭제됨
         httpOnly: true, //javascript로 쿠키에 접근가능한지 여부 -> true 일경우 접근 X
         secure: false, //https를 사용할때만 쿠키 전송 여부 -> http, https 둘다 사용가능
      },
   })
)

//라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/page', pageRouter)
app.use('/user', userRouter)

//잘못된 라우터 경로 처리
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) //에러객체 생성
   error.status = 404 // 404 상태코드 설정
   next(error) //에러 미들웨어로 전달
})

//에러처리
app.use((err, req, res, next) => {
   const statusCode = err.static || 500
   const errMessage = err.message || '서버 내부 오류'

   //클라이언트에 에러 json객체 res
   res.status(statusCode).json({
      success: false, //성공여부(필수값x)
      message: errMessage, //에러메세지
      error: err, //에러객체
   })
})

app.listen(app.get('port'), () => {
   console.log(`${app.get('port')}번 포트에서 대기중`)
})
