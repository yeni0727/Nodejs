const Sequelize = require('sequelize')

module.exports = class Country extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true, //deletAt생성
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.User.hasMany(db.Post, {
         foreignKey: 'user_id',
         sourceKey: 'id',
      })
   }
}
