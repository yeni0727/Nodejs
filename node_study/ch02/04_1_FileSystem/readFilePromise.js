const fs = require('fs').promises

fs.readFile('./readme.txt')
   .then((date) => {
      console.log(date.toString())
   }) //파일내용 출력
   .catch((err) => {
      console.log(err)
   }) //에러발생시 에러
