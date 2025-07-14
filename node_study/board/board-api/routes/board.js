const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { Board } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

const uploadDir = path.join(__dirname, '../uploads')

// 업로드 폴더 있는지 없으면 만들기
try {
   fs.readdirSync(uploadDir)
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync(uploadDir)
}

// multer 설정 (uploads 폴더에 저장)
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') // 상대 경로
      },
      filename(req, file, cb) {
         const decodeFileName = decodeURIComponent(file.originalname) // 한글명 깨짐 방지
         const ext = path.extname(decodeFileName)
         const basename = path.basename(decodeFileName, ext)
         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
})

// 게시글 작성
router.post('/', isLoggedIn, upload.single('img'), async (req, res, next) => {
   try {
      console.log('Received file:', req.file) // 파일 확인
      const { title, content } = req.body
      const img = req.file ? req.file.filename : null

      const board = await Board.create({
         title,
         content,
         img,
         memberId: req.user.id,
      })

      res.status(201).json({
         success: true,
         message: '게시글이 등록되었습니다.',
         board,
      })
   } catch (error) {
      console.error('Error occurred:', error) // 에러 로그
      next(error)
   }
})

module.exports = router
