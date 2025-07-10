const express = require('express')
const bcrypt = require('bcrypt') //암호화모듈
const router = express.Router()
const User = require('../models/user')

//회원가입 localhost:8000/auth
router.post('/join', async (req, res, next) => {
   try {
      const { email, nick, password } = req.body

      //이메일로 기존 사용자 검색(SELECT * FROM USERS WHERE EMAIL = ? LIMIT 1;)
      const exUser = await User.findOne({
         where: { email },
      })
      //기존 사용자일때
      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다',
         })
      }

      //이메일 중복 X -> 새로운 사용자 계정 생성
      //1.비밀번호 암호화
      const hash = await bcrypt.hash(password, 12) //12:salt(해시 암호화를 진행시 추가되는 임의의 데이트로 주로 10~12정도의 값이 권장됨)

      //2.새로운 사용자 생성
      const newUser = await User.create({
         email,
         nick,
         password: hash,
      })

      //3.성공 응답 반환
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
         },
      })
   } catch (error) {
      //에러 발생시 미들웨어로 전달
      error.message = '회원가입 중 오류가 발생했습니다.'
      next(error)
   }
})
module.exports = router
