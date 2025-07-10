const express = require('express')
const Order = require('../models/order')
const Customer = require('../models/customer')
const router = express.Router()

router.get('/', async (req, res, next) => {
   try {
      const orders = await Order.findAll()
      res.status(200).json(orders)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

router.post('/', async (req, res, next) => {
   try {
      const order = await Order.create({
         orderNumber: req.body.orderNumber,
         totalPrice: req.body.totalPrice,
         status: req.body.status,
      })
      res.status(201).json(order)
   } catch (error) {
      console.error(error)
      next(error)
   }
})

router.patch('/:id', async (req, res, next) => {
   try {
      const result = await Order.update(
         {
            orderNumber: req.body.orderNumber,
            totalPrice: req.body.totalPrice,
            status: req.body.status,
         },
         {
            where: { id: req.params.id },
         }
      )
      if (result[0] === 0) {
         return res.status(404).json({ message: '주문을 찾을 수 없습니다' })
      }
      res.status(201).json({ message: '주문이 수정되었습니다', result })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

router.delete('/:id', async (req, res, next) => {
   try {
      const result = await Order.destroy({
         where: { id: req.params.id }, // where 조건 필수
      })

      if (result === 0) {
         return res.status(404).json({ message: '주문을 찾을 수 없습니다.' })
      }

      res.status(200).json({ message: '주문이 삭제되었습니다', result })
   } catch (error) {
      console.error(error)
      next(error)
   }
})

module.exports = router
