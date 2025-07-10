const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 업로드 폴더 확인 및 생성
try {
   fs.accessSync('uploads') // 폴더가 있는지 확인
} catch (error) {
   console.log('uploads폴더가 없으므로 폴더를 생성합니다')
   fs.mkdirSync('uploads') // 폴더생성
}

// 업로드 파일 설정
const upload = multer({
   storage: multer.diskStorage({
      // 업로드 파일 저장 경로 설정
      destination(req, file, done) {
         done(null, 'uploads/')
      },
      // 저장할 파일 이름 설정
      filename(req, file, done) {
         const ext = path.extname(file.originalname) // 파일 확장자 추출
         //done(null, 어떤 파일명으로 저장할건지
         //Date.now(): 중복되지 않는 날짜데이터 생성해서 파일명 중복X
         done(null, path.basename(file.originalname, ext) + Date.now() + ext) // 어떤 파일명으로 저장할지 지정
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

// 파일 업로드
//이름이 image1,2인 파일을 여러개 업로드
app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
   console.log(req.files) // 업로드 된 파일 정보 출력
   res.send('파일 업로드 완료')
})

// 업로드 페이지
app.get('/upload', (req, res) => {
   res.sendFile(path.join(__dirname, 'multipart.html'))
})

app.listen(app.get('port'), () => {
   console.log(`서버가 작동 중 입니다. http://localhost:${app.get('port')}`)
})
