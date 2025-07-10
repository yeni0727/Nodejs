const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res, next) => {
   //select * from users;
   try {
      const users = await User.findAll()
      console.log('users:', users)
      res.status(200).json(users) //성공
   } catch (error) {
      console.error(error)
      next(error) //에러처리 미들웨어로 이동
   }
})

module.exports = router
