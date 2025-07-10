const fs = require('fs')

//readfile(읽을 파일 경로,콜백함수)
fs.readFile('./readme.txt', (err, data) => {
   //data:파일 내용
   //err:파일을 읽는 도중 에러 발생시 에러 메시지
   if (err) {
      throw err
   }
   console.log(data) //Buffer 2진데이터
   console.log(data.toString())
})
