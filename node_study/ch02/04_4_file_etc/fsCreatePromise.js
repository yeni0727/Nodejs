const fs = require('fs').promises
const constants = require('fs').constants //파일 시스템 관련 상수를 가져온다

//'./folder'에 대한 접근 권한 확인
// F_OK:파일본재 여부  W_OK:쓰기 권한 여부  R_OK:읽기 권한 여부
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)

   .then(() => {
      return Promise.reject('이미 폴더가 있음') //폴더가 이미 있는 경우 에러처리
   })

   .catch((err) => {
      //폴더가 없는경우
      if (err.code === 'ENOENT') {
         //폴더 생성
         console.log('폴더 없음')
         return fs.mkdir('./folder')
      }
      //폴더가 없는 것 외에 다른 에러 발생시 에러를 그대로 전달
      console.error('err1:', err)
      return Promise.reject(err)
   })

   .then(() => {
      //폴더 생성이 성공했을때
      console.log('폴더 만들기 성공')
      //file.js파일 생성(w:쓰기모드)
      return fs.open('./folder/file.js', 'w')
   })

   .then((fd) => {
      //파일 생성 성공했을때
      console.log('빈 파일 만들기 성공', fd)
      return fs.rename('./folder/file.js', './folder/newFile.js')
   })
   .then(() => {
      console.log('이름 바꾸기 성공')
   })

   .catch((err) => {
      //모든 단계에서 발생한 에러처리
      console.error('err2:', err)
   })
