const express = require('express')
const User = require('../models/user')
const Comment = require('../models/comment')
const { where } = require('sequelize')
const router = express.Router()

//http://localhost:8000/users
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

//http://localhost:8000/users/:id
router.get('/:id', async (req, res, next) => {
   try {
      //select id from users where id= :id
      const users = await User.findAll({
         where: { id: req.params.id },
      })
      res.status(200).json(users)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

//특정 사용자가 작성한 모든 댓글 가져오기
//http://localhost:8000/users/3/comments
/*router.get('/:id/comments', async (req, res, next) => {
   try {
      const comments = await Comment.findAll({
         attributes: ['commnet', 'create_at'], //comments 테이블의 특정 컬럼만
         include: {
            model: User,
            where: { id: req.params.id },
            // attributes: ['name'] : users테이블 특정컬럼만 가져옴
         },
      })
      res.status(200).json(comments)
   } catch (error) {
      console.error(error)
      next(error)
   }
}) */

router.get('/:id/comments', async (req, res, next) => {
   try {
      const users = await User.findAll({
         where: { id: req.params.id },
         include: {
            model: Comment,
            attributes: ['comment', 'create_at'],
         },
      })
      res.status(200).json(users[0].Comments)
   } catch (error) {
      console.error(err)
      next(err)
   }
})

//특정 사용자 등록
//http://localhost:8000/users
router.post('/', async (req, res, next) => {
   try {
      console.log(req.body)

      const user = await User.create({
         name: req.body.name,
         age: req.body.age,
         married: req.body.married,
         comment: req.body.comment,
      })
      console.log(user)
      res.status(201).json(user) //creat 성공시에는 상태코드201
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
