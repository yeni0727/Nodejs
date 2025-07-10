const express = require('express')
const router = express.Router() //라우터(경로를 지정)를 가져온다

router.get(
   '/',
   (req, res, next) => {
      next('route')
   },
   (req, res, next) => {
      console.log('실행되지 않습니다.')
      next()
   },
   (req, res, next) => {
      console.log('실행되지 않습니다.')
      next()
   }
)

// localhost:8000/
router.get('/', (req, res) => {
   res.send('Hello, Express')
})

// localhost:8000/test
router.get('/test', (req, res) => {
   res.send('Hello, Express test')
})

// localhost:8000/user
// localhost:8000/?
router.get('/:id', (req, res) => {
   res.send('GET /' + req.params.id)
})

//localhost:8000/?/test
router.get('/:id/test', (req, res) => {
   res.send('GET /' + req.params.id + '/test')
})

module.exports = router //라우터를 내보냄
