const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            contents: {
               type: Sequelize.STRING(140),
               allowNull: false,
            },
            image: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, //creatAt, updateAt:자동으로 생성
            underscored: false,
            modelName: 'Post',
            tableName: 'posts', //무조건 복수형으로 안해도됨
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
   }
}
