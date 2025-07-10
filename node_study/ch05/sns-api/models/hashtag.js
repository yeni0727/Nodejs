const Sequelize = require('sequelize')

module.exports = class Country extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(15),
               allowNull: false,
               unique: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Post.belongsToMany(db.Post, {
         through: 'PostHashtag',
         foreignKey: 'hashtag_id',
         sourceKey: 'post_id',
      })
   }
}
