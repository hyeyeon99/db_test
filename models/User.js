const passwordHash = require('../helpers/passwordHash');

module.exports = function(sequelize, DataTypes){
    //sequelize.define(객체 이름, 테이블정의, 테이블설정)
    const User = sequelize.define('User',
        {
            id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
            username : { 
                type: DataTypes.STRING, //데이터타입
                validate : {
                    len : [0, 50]
                },
                allowNull : false   //null값 허용
            },
            
            password : { 
                type: DataTypes.STRING,
                validate : {
                    len : [3, 100]
                } ,
                allowNull : false
            },
            
            displayname : { type: DataTypes.STRING }

        },{
            tableName: 'User'
        }
    );

    // 제품 모델 관계도
    User.associate = (models) => {

        // 메모 모델에 외부키를 건다
        // onDelete 옵션의 경우 제품 하나가 삭제되면 외부키가 걸린 메모들도 싹다 삭제해준다 단 sync를 다시 해줘야됨
        // as 의 경우 모델명과 똑같이 하지 않는다 Products (x)
        User.hasMany(
            models.Products, 
            {   
                as: 'Product', 
                foreignKey: 'user_id',  //컬럼 이름 정함
                sourceKey: 'id' ,       // 
                onDelete: 'CASCADE'
            }
        );
        
    };

    User.beforeCreate((user, _) => {
        user.password = passwordHash(user.password);
    });

    return User;
}

