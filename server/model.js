const sequelize = require('./models').sequelize;

const {
    Board,
    Category,
    User,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        searchInfo : (body, hash, callback) => {
            User.findAll({
                where : { [Op.and]: [{ id : body.id, password : hash }] }
            })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
        },
    },

    search : {
        
        id : (body, callback) => {
            User.findAll({
                where: {
                    name : body.user_name,
                    birthday : body.user_birthday,
                    sex : body.user_sex,
                    email : body.user_email
                }
            })
            .then(result => { callback(result) })
            .catch(err => { throw err; })
        },

        pw : (body, callback) => {
            User.findAll({
                where : {
                    id : body.user_id,
                    email : body.user_email
                }
            })
            .then(result => { callback(result) })
            .catch(err => { throw err; })
        }
    },

    add : {
        board : (body, callback) => {
            Board.create({
                title : body.title,
                contents : body.contents,
                date : now_date,
                view_cnt : 0,
                cat_id : 0,
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        },

        category : (body, callback) => {
            Category.count({
                where : { name : body.name }
            })
            .then(cnt => {
                if(cnt > 0) {
                    callback(false);
                } else {
                    Category.create({
                        name : body.name
                    })
                    .then( () => { callback(true) })
                }
            })
        },

        user : (body, hash_pw, now_date, callback) => {
            
            User.count({
                where : { id : body.id }
            })
            .then(cnt => {
                if(cnt > 0) {
                    callback(false);
                } else {
                    User.create({
                        admin : 'N',
                        id : body.id,
                        password : hash_pw,
                        name : body.name,
                        birthday : body.birthday,
                        sex : body.sex,
                        email : body.email,
                        signup_date : now_date
                    })
                    .then( () => callback(true) );
                }
            })
        }
    },

    update : {
        view_cnt : (body, callback) => {
            Board.update({ view_cnt : sequelize.literal('view_cnt + 1')}, {
                where : { board_id : body.id }
            })
            .then(data => { callback(true) })
            .catch(err => { throw err; })
        },

        password : (body, hash_pw, callback) => {
            User.update({ password : hash_pw }, {
                where : { id : body.user_id }
            })
            .then( () => { callback(true) })
            .catch(err => { throw err; })
        }
    },

    delete : {
        category : (body, callback) => {
            Category.destroy({
                where : { id : body.id }
            })
            .then( () => {
                Board.update({ cat_id : 0 }, {
                    where : { cat_id : body.id }
                })
                .then( () => { callback(true) })
                .catch(err => { throw err; })
            })
        }
    },

    modify : {
        category : (body, callback) => {
            console.log(body)
            Category.count({
                where : { name : body.name }
            })
            .then(cnt => {
                console.log(cnt)
                if(cnt > 0) {
                    callback(false);
                    
                } else {
                    Category.update({ name : body.name }, {
                        where : { id : body.id }
                    })
                    .then( () => { callback(true) })
                    .catch(err => { throw err; })
                }
            })
        }
    },


    get : {

        board : (body, callback) => {
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }
            Board.findAll({
                where : {
                    title : {
                        [Op.like] : search
                    },
                    contents : {
                        [Op.like] : search
                    },
                    cat_id : body.category
                },
                    limit : (body.page * body.limit),
                    offset : (body.page - 1) * body.limit,
                    order: sequelize.literal('board_id DESC')
                })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
        },

        board_cnt : (body, callback) => {
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }
    
            Board.count({
                where : {
                    title : {
                        [Op.like] : search
                    },
                    contents : {
                        [Op.like] : search
                    },
                    cat_id : body.category
                }
            })
            .then(result => {
                callback(result);
            })
        },

        board_data : (body, callback) => {
            Board.findAll({
                where : { board_id : body.id }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },

        category : (callback) => {
            Category.findAll()
            .then(result => { callback(result); })
            .catch(err => { throw err; })
        }
    }
    


    
        /*
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
        */
}