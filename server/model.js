const sequelize = require('./models').sequelize;

const {
    Teacher,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        getData : callback => {
            Teacher.findAll()
            .then( result => { callback(result) })
            .catch( err => { throw err })
        },

        addData : (body, callback) => {
            Teacher.create({
                name : body.data
            })
            .then( result => {
                callback(result)
            })
            .catch( err => {
                console.log(err)
                throw err;
            })
        },

        modifyData : (body, callback) => {
            Teacher.update({ name : body.modify.name }, {
                where : { id : body.modify.id }
            })
            .then( result => { callback(result) })
            .catch( err => { throw err })
        },

        deleteData : (body, callback) => {
            Teacher.destroy({
                where : { id : body.delete.id }
            })
            .then( callback(true) )
            .catch( err => { throw err })
        }
    }
}