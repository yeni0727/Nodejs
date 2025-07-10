const express = require('express')
const router = express.Router() //라우터(경로를 지정해주는 라이브러리)를 가져온다

// router.get('/', (req, res) => {
//    res.send('Hello, User')
// })

// router.get('/test', (req, res) => {
//    res.send('Hello, User test')
// })

// localhost:8000/user/?
// localhost:8000/user/person?page=1&lang=ko
router.get('/:id', (req, res) => {
   console.log(req.params) //path파라미터
   console.log(req.query) //쿼리스트링

   res.send('Hello,User' + req.params.id)
})
/*
router.get('/cate/abc', (req, res) => {
   res.send('')
})

router.post('/cate/abc', (req, res) => {
   res.send('')
})

인 경우 아래와 같이 하나로 작성가능
*/
router
   .route('/cate/abc')
   .get((req, res) => {
      res.send('GET/cate/abc')
   })
   .post((req, res) => {
      res.send('POST/cate/abc')
   })

module.exports = router //라우터를 내보냄
