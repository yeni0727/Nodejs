const express = require('express')
const Customer = require('../models/customer')
const Order = require('../models/order')
const router = express.Router()

router.get('/', async (req, res, next) => {
   //select * from customers;
   try {
      const customers = await Customer.findAll()
      console.log('customers:', customers)
      res.status(200).json(customers) //성공
   } catch (error) {
      console.error(error)
      next(error) //에러처리 미들웨어로 이동
   }
})

router.get('/customers/:id/orders', async (req, res, next) => {
   try {
      const customerId = req.params.id
   } catch (error) {
      console.error('고객 주문 조회 중 오류:', error)
      next(error)
   }
})
module.exports = router
