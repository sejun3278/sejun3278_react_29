const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'db.json'))
 .salt

const hashing = require(path.join(__dirname, 'config', 'hashing.js'))

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const now_date = moment().format('YYYY-MM-DD HH:mm:ss');

// 사용자 아이피 가져오기
const user_ip = require("ip");

// 이메일 보내기
const nodeMailer = require('nodemailer');

// 메일 발송 서비스에 대한 환경 설정
const mailPoster = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: /* 메일에 사용할 아이디 입력 */ example,
    pass: /* 메일에 사용할 비밀번호 입력 */ example
  }
});

// 메일을 받을 유저 설정
const mailOpt = (user_data, title, contents) => {
  const mailOptions = {
    from: /* 메일에 사용할 아이디 입력 */ example,
    to: user_data.email ,
    subject: title,
    text: contents
  };

  return mailOptions;
}

// 메일 전송
const sendMail = (mailOption) => {
  mailPoster.sendMail(mailOption, function(error, info){
    if (error) {
      console.log('에러 ' + error);
    }
    else {
      console.log('전송 완료 ' + info.response);
    }
  });
}

  module.exports = {
    needs: () => upload,
    api : {
        sendPw : (req, res) => {

          const body = req.body;
          const hash = hashing.enc(body.id, body.password, salt)

          model.api.searchInfo(body, hash, result => {
          
            var obj = {};
            if(result[0]) {
                obj['suc'] = result[0].dataValues;
                obj['msg'] = '로그인 성공';
                obj['ip'] = user_ip.address();

              } else {
                obj['suc'] = false;
                obj['msg'] = '로그인 실패';
              }
              res.send(obj);
          })
        },
    },

    search : {
      id : (req, res) => {
        const body = req.body;

        model.search.id(body, result => {
          res.send(result)
        })
      },

      pw : (req, res) => {
        const body = req.body;

        model.search.pw(body, result => {
          var res_data = {};

          if(result[0]) {
            const title = "비밀번호 조회 인증에 대한 6자리 숫자입니다.";
            const contents = () => {
              let number = "";
              let random = 0;

              for(let i = 0; i < 6; i++) {
                random = Math.trunc(Math.random() * (9 - 0) + 0);
                number += random;
              }
              
              res_data['secret'] = number;
              return "인증 칸에 아래의 숫자를 입력해주세요. \n" + number;
            }

            // 조회되는 데이터가 있는 경우 (메일 전송)
            const mailOption = mailOpt(result[0].dataValues, title, contents());
            sendMail(mailOption)

            res_data['result'] = result;
            res.send(res_data)

          } else {
            // 데이터가 조회되지 않을 경우
            res.send(false)
          }
        })
      }
    },

    add : {
      board : (req, res) => {
        const body = req.body;

        model.add.board(body, result => {
          if(result) {
            res.send(true);
          }
        })
      },

      category : (req, res) => {
        const body = req.body;

        model.add.category(body, result => {
          var obj = {};
          if(result) {
              obj['suc'] = true;
              obj['msg'] = '카테고리가 생성되었습니다.';

            } else {
              obj['suc'] = false;
              obj['msg'] = '이미 있는 카테고리 입니다.';
            }
          
          res.send(obj)
        })
      },

      user : (req, res) => {
        const body = req.body;

        const hash_pw = hashing.enc(body.id, body.password, salt);
        
        model.add.user(body, hash_pw, now_date, result => {
          res.send(result);
        })
      }
    },

    update : {
      view_cnt : (req, res) => {
        const body = req.body;

        const expires = new Date()
        expires.setDate(expires.getDate() + 1)

        const cookie_name = 'board_' + body.id
        const exist_cookie = req.cookies[cookie_name]

        if(!exist_cookie) {
          res.cookie(cookie_name, true, {
            expires: expires
          });
          
          model.update.view_cnt(body, result => {
            if(result) {
              res.send(true);
            }
          })
        }
      },

      password : (req, res) => {
        const body = req.body;
        const hash_pw = hashing.enc(body.user_id, body.change_password, salt);

        model.update.password(body, hash_pw, result => {
          res.send(true)
        })
      }
    },

    delete : {
      category : (req, res) => {
        const body = req.body;

        model.delete.category(body, result => {
          if(result) {
            res.send(result);
          }
        })
      }
    },

    modify : {
      category : (req, res) => {
        const body = req.body;

        model.modify.category(body, result => {
          var obj = {};

          if(result) {
              obj['suc'] = true;
              obj['msg'] = '카테고리가 변경되었습니다.';

            } else {
              obj['suc'] = false;
              obj['msg'] = '이미 있는 카테고리 입니다.';
            }
          
          res.send(obj)
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
        const body = req.body;

        model.get.board_cnt(body, cnt => {
          const result = { cnt : cnt }
          res.send(result)
        })
      },

      board_data : (req, res) => {
        const body = req.body;

        model.get.board_data(body, data => {
          res.send(data)
        })
      },

      category : (req, res) => {

        model.get.category(data => {
          res.send(data)
        })
      }
    }
    
  }