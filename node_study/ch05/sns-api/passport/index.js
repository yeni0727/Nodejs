const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

module.exports = () => {
   //직렬화(serializeUser):로그인 성공 후 사용자 정보를 세션에 저장
   passport.serializeUser((user, done) => {
      console.log('🧚‍♀️user: ', user)

      done(null, user.id)
   })
   //역직렬화(deserializeUser):클라이언트에게 req가 올때마다 세션에 저장된 사용자 id(user테이블에 pk)를 바탕으로 사용자 정보를 조회
   passport.deserializeUser((id, done) => {
      //id는 직렬화에서 저장한 user id
      //rep해주고 싶은 사용자를 가져온다
      User.findOne({
         where: { id },
         attributes: ['id', 'nick', 'email', 'createdAt', 'updatedAt'],
      })
         .then((user) => done(null, user))
         .catch((err) => done(err))
   })

   local() //localStrateg.js에서 export된 함수를 passport에 추가
}
