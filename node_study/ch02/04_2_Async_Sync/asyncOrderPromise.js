const fs = require('fs').promises

//promises자체는 비동기인데 then때문에 순차적으로 실행됨

console.log('시작')
fs.readFile('./readme2.txt').then((data) => {
   console.log('1번', data.toString())
   return fs.readFile('./readme2.txt')
})
fs.readFile('./readme2.txt').then((data) => {
   console.log('2번', data.toString())
   return fs.readFile('./readme2.txt')
})
fs.readFile('./readme2.txt')
   .then((data) => {
      console.log('3번', data.toString())
      console.log('끝')
   })
   .catch((err) => {
      console.log(err)
   })
