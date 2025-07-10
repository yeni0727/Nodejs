//양방향 암호화:함호화 한것을 다시 복호화 할 수 있음, 이때 반드시 key 필요

const crypto = require('crypto')

const algorithm = 'aes-256-cbc'
const key = 'abcdefghijklmnopqrstuvwxyz123456'
const iv = '1234567890123456'

/*
uft-8:사람이 읽을 수 있는 문자열을 컴퓨터가 알아볼 수 있는 이진데이터로 바꾸는 인코딩 방식
ex) '암호화할 문장' -> <buffer ec 93 20 de ...>

-base:이진데이터를 네트워크 상에서 안전하게 전송하기 위해 텍스트로 바꿈(의미는 없음)
-이진데이터를 포함한 암호화 결과,이미지,파일등을 텍스트로 바꿀때 사용
ex) iiopeG2GsYlk6ccoBoFvEH2EBDMWv1kK9bNuDjYxiN0=
*/

//암호화
const cipher = crypto.createCipheriv(algorithm, key, iv)
let result = cipher.update('암호화할 문장', 'uft-8', 'base64')
result += cipher.final('base64')
console.log('암호화: ', result)

//복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let result2 = decipher.update(result, 'base64', 'utf-8')
result2 += decipher.final('utf-8')
console.log('복호화:', result2)
