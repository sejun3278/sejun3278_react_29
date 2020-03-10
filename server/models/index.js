'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
  ];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    }
  );
  
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

    db.Board = require('./board')(sequelize, Sequelize);
    db.Category = require('./category')(sequelize, Sequelize);
    db.User = require('./user')(sequelize, Sequelize);

    db.Category.hasMany(db.Board, {
      foreignKey: 'cat_id',
      sourceKey : 'id'
    });
    db.Board.belongsTo(db.Category, {
        foreignKey: 'cat_id',
        targetKey : 'id'
    });
    
module.exports = db;