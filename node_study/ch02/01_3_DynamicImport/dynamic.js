const a = true

// dynamic import: 특정에 조건일때 require
// commonJS 모듈 방식일땐 문제 없이 사용가능
if (a) {
   require('./func')
}

console.log('성공')
