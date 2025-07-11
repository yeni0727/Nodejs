const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

//로그인 시 사용자 정보를 db에서 조회하고 사용자 존재 여부와 비밀번호 비교

module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            //input태그에서 name으로 사용하는 이름을 지정
            usernameField: 'email', //req.body.email
            passwordField: 'password', //req.body.password
         },
         async (email, password, done) => {
            try {
               //1.이메일로 사용자 조회
               const exUser = await User.findOne({ where: { email } })
               //2.해당하는 사용자가 있으면 비번이 맞는지 확인(사용자가 입력한 비번과 db에서 가져온 기번 비교)
               if (exUser) {
                  const result = await bcrypt.compare(password, exUser.password)
                  if (result) {
                     done(null, exUser) //일치할때 사용자 객체를 passport에 반확
                  } else {
                     done(null, false, { message: '비밀번호가 일치하지 않습니다' })
                  }
               } else {
                  //3.사용자가 없을경우
                  done(null, false, { message: '가입되지 않은 회원입니다.' })
               }
            } catch (error) {
               console.log(error)
               done(error) //passport에 에러 객체 전달 -> 이후 passport에서 에러 미들웨어로 전달
            }
         }
      )
   )
}
