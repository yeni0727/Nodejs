const express = require('express')
const Customer = require('../models/customer')
const router = express.Router()

router.get('/', async (req, res, next) => {
   try {
      const customers = await Customer.findAll()
      res.status(200).json(customers)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

router.post('/', async (req, res, next) => {
   try {
      console.log(req.body)
      const customer = await Customer.create({
         fullName: req.body.fullName,
         email: req.body.email,
         phoneNumber: req.body.phoneNumber,
      })

      res.status(201).json(customer)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

router.patch('/:id', async (req, res, next) => {
   try {
      const result = await Customer.update(
         {
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
         },
         {
            where: { id: req.params.id },
         }
      )
      if (result[0] === 0) {
         return res.status(404).json({ message: '고객을 찾을 수 없습니다.' })
      }
      res.status(200).json({ message: '정보가 수정되었습니다', result })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

router.delete('/:id', async (req, res, next) => {
   try {
      const result = await Customer.destroy({
         where: { id: req.params.id },
      })
      if (result === 0) {
         return res.status(404).json({ message: '고객을 찾을 수 없습니다.' })
      }
      res.status(200).json({ message: '정보가 삭제되었습니다', result })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
