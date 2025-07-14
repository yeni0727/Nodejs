const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()
const Member = require('../models/member')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

// 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
   try {
      const { email, name, password } = req.body

      const exMember = await Member.findOne({
         where: { email },
      })

      if (exMember) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다',
         })
      }

      const hash = await bcrypt.hash(password, 12)

      const newMember = await Member.create({
         email,
         name,
         password: hash,
      })

      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         member: {
            id: newMember.id,
            email: newMember.email,
            name: newMember.name,
         },
      })
   } catch (error) {
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
   passport.authenticate('local', (authError, member, info) => {
      if (authError) {
         console.error(authError)
         return next(authError)
      }
      if (!member) {
         return res.status(401).json({
            success: false,
            message: info.message || '로그인에 실패했습니다.',
         })
      }

      return req.login(member, (loginError) => {
         if (loginError) {
            console.error(loginError)
            return next(loginError)
         }
         return res.json({
            success: true,
            message: '로그인 성공',
            member: {
               id: member.id,
               email: member.email,
               name: member.name,
            },
         })
      })
   })(req, res, next)
})

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
   req.logout((err) => {
      if (err) {
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
         })
      }
      res.json({
         success: true,
         message: '로그아웃 되었습니다.',
      })
   })
})

router.get('/status', isLoggedIn, (req, res) => {
   res.json({
      success: true,
      message: '로그인 상태입니다.',
      member: {
         id: req.user.id,
         email: req.user.email,
         name: req.user.name,
      },
   })
})
module.exports = router
