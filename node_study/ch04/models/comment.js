const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            create_at: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false, // 컬럼이름을 카멜케이스로 유지할건지 -> 유지 X
            modelName: 'Comment', // 시퀄라이즈에서 사용하는 모델이름(클래스명 작성)
            tableName: 'comments', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제(soft delete) 활성화 여부 -> 비활성화
            charset: 'utf8mb4', //데이터베이스 생성할때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', //데이터베이스 생성할때 collate와 똑같이 사용
         }
      )
   }

   static associate(db) {
      //Commnet(자식)은 User(부모)에 속해있다
      db.Comment.belongsTo(db.User, {
         foreignKey: 'commenter', //외래키 이름 지정
         targetKey: 'id', //commneter가 users테이블에서 참조하는 컬럼이름 (users테이블의 PK)
      })
   }
}
