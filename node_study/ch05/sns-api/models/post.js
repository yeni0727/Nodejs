const Sequelize = require('sequelize')

module.exports = class Country extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            //글내용
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            img: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Post.belongsTo(db.User, {
         foreignKey: 'user_id',
         sourceKey: 'id',
      })

      db.Post.belongsToMany(db.Hashtag, {
         through: 'PostHashtag',
         foreignKey: 'post_id', //교체테이블에서 post모델의 pk
         sourceKey: 'hashtag_id', //hashtag모델의 fk
      })
   }
}
