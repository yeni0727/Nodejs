const express = require('express')
const Comment = require('../models/comment') //가져오는거 까먹지말기
const { where } = require('sequelize')
const router = express.Router()

//새로운 댓글 등록
//localhost:8000/comments/:id
router.post('/', async (req, res, next) => {
   try {
      const comment = await Comment.create({
         commenter: req.body.id, //댓글 작성자 id
         comment: req.body.comment, //댓글사용
      })
      console.log(comment)
      res.status(201).json(comment)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

//댓글 수정 (put:전체수정 patch:일부수정)
router.patch('/:id', async (req, res, next) => {
   try {
      //update comments set comment = '수정댓글' where id =:id
      const result = await Comment.update(
         {
            comment: req.body.comment, //수정할 댓글 내용
         },
         {
            where: { id: req.params.id },
         }
      )
      console.log(result)
      //result[0]:수정된 레코드의 갯수
      if (result[0] === 0) {
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' })
      }
      res.status(200).json({ message: '댓글이 수정되었습니다', result })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

//댓글 삭제(localhost:8000/comments/:id)
//delete from comments where id =:id
router.delete('/:id', async (req, res, next) => {
   try {
      const result = await Comment.destroy({
         where: { id: req.params.id },
      })
      console.log(result)
      //삭제 된 데이터가 없을경우
      if (result[0] === 0) {
         return res.status(404).json({ message: '댓글을 찾을 수 없습니다' })
      }
      res.status(200).json({ message: '댓글이 삭제되었습니다', result })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
