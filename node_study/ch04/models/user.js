const Sequelize = require('sequelize')

//claa명은 파일명과 똑같이 작성하되 대문자로 시작
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(20), //varchar(20)
               allowNull: false, //not null
               unique: true, //제약조건->중복허용X
            },
            age: {
               type: Sequelize.INTEGER.UNSIGNED, //양수만 가능
               allowNull: false,
            },
            married: {
               type: Sequelize.BOOLEAN, //true, false값이 저장되는 타입  MySQL에서는 TINYINT(1)
               allowNull: false,
            },
            comment: {
               type: Sequelize.TEXT, //text(긴텍스트가능)
               allowNull: false,
            },
            create_at: {
               type: Sequelize.DATE, //날짜와 시간을 저장하는 datetime
               allowNull: false,
               defaultValue: Sequelize.NOW, // 기본값으로 현재 시간 설정
            },
         },
         {
            sequelize,
            //자동생성되는 createAt과 updateAt 컬럼을 활성화 여부 -> 생성X
            // createdAt: 레코드 생성 시 자동으로 현재 시간 입력
            // updatedAt: 레코드 수정 시 자동으로 현재 시간 업데이트
            timestamps: false,
            underscored: false, // 컬럼이름을 카멜케이스로 유지할건지 -> 유지 X
            modelName: 'User', // 시퀄라이즈에서 사용하는 모델이름(클래스명)
            tableName: 'users', // 데이터베이스에서 사용하는 실제 테이블 이름
            paranoid: false, // 소프트 삭제(soft delete) 활성화 여부 -> 비활성화
            charset: 'utf8mb4', //문자 인코딩 설정:데이터베이스 생성할때 charset과 똑같이 사용
            collate: 'utf8mb4_general_ci', //데이터베이스 생성할때 collate(문자 정렬 규칙)와 똑같이 사용
         }
      )
   }
   static associate(db) {
      //User:Commnet:1:n
      db.User.hasMany(db.Comment, {
         foreignKey: 'commenter',
         sourceKey: 'id', //외래키로 제공할 컬럼 이름
      })
   }
}
