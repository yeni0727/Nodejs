const passport = require('passport')
const local = require('./localStrategy')
const Member = require('../models/member')

module.exports = () => {
   passport.serializeMember((member, done) => {
      console.log('🧚‍♀️member: ', member)

      done(null, member.id)
   })

   passport.deserializemember((id, done) => {
      Member.findOne({
         where: { id },
         attributes: ['id', 'nick', 'email', 'creatAt', 'updatedAt'],
      })
         .then((member) => done(null, member))
         .catch((err) => done(err))
   })

   local()
}
