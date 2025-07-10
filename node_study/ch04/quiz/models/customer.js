const Sequelize = require('sequelize')

module.exports = class Customer extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            fullName: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            email: {
               type: Sequelize.STRING(150),
               allowNull: false,
               unique: true,
            },
            phoneNumber: {
               type: Sequelize.STRING(50),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Customer',
            tableName: 'customers',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Customer.hasMany(db.Order, {
         foreignKey: 'CustomerId',
         sourceKey: 'id',
      })
   }
}
