const crypto = require('crypto')

console.log(crypto.createHash('sha512').update('비밀번호').digest('base64'))
console.log('-------------------------')
console.log(crypto.createHash('sha512').update('비밀번호').digest('hex'))
console.log('-------------------------')
console.log(crypto.createHash('sha512').update('password222').digest('base64'))
