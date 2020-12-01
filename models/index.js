var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs'); //파일처리
var dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize( process.env.DATABASE,
process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', //한국 시간 셋팅
    operatorsAliases: Sequelize.Op, //보안을 위한 별칭?
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

let db = [];

fs.readdirSync(__dirname) //디렉토리 읽기(string)
    .filter(file => {   //조건에 일치하는 것만 추출
        return file.indexOf('.js')&& file !== 'index.js'
    })
    .forEach(file => {
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name] = model;
    });

//모델 간의 관계 설정
Object.keys(db).forEach(modelName => {
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

//db객체에 sequelize 패키지와 객체를 넣고 모듈로 사용
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;