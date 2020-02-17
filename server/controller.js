const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'db.json'))
 .salt

const hashing = require(path.join(__dirname, 'config', 'hashing.js'))

  module.exports = {
    needs: () => upload,
    api : {
        sendPw : (req, res) => {
          const body = req.body;
          const hash = hashing.enc(body.id, body.password, salt)
          
          model.api.searchInfo(body, hash, result => {
            var obj = {};
            if(result[0]) {
                obj['suc'] = true;
                obj['msg'] = '로그인 성공';

              } else {
                obj['suc'] = false;
                obj['msg'] = '로그인 실패';
              }
              
              res.send(obj);
          })
        },
    },

    add : {
      board : (req, res) => {
        const body = req.body;

        model.add.board(body, result => {
          if(result) {
            res.send(true);
          }
        })
      }
    },

    get : {
      board : (req, res) => {
        const body = req.body;
        
        model.get.board(body, result => {
          if(result) {
            res.send(result);
          }
        })
      },

      board_cnt : (req, res) => {

        model.get.board_cnt(cnt => {
          const result = { cnt : cnt }
          res.send(result)
        })
      }
    }
    
  }