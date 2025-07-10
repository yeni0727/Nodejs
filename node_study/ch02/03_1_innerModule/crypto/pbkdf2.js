const crypto = require('crypto')

//buf:랜덤한 바이트 데이터
//64바이트의 랜덤 바이트를 생성
//buf를 bash64로 인코딩 -> 이게 salt값
crypto.randomBytes(64, (err, buf) => {
   const salt = buf.toString('base64')
   console.log('salt: ', salt)

   //salt과 sha512알고리즘을 이용해 100000번 반복해서 암호화
   crypto.pbkdf2('password111', salt, 100000, 64, 'sha512', (err, key) => {
      console.log(key.toString('base64')) //암호화한 결과를 base64로 인코딩해 출력
   })
})
