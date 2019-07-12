const path = require('path');
const model = require('./model');

const AWS = require('aws-sdk');
AWS.config.loadFromPath(
    path.join(__dirname, 'config', 'awsConfig.json')
  );

  module.exports = {
    needs: () => upload,
    api : {
        getData : (req, res) => {
            model.api.getData( data => {
                return res.send( data )
            })
        },

        addData : (req, res) => {
            let body = req.body

            model.api.addData( body, data => {
                return res.send(true)
            })
        },

        modifyData : (req, res) => {
            let body = req.body

            model.api.modifyData(body, data => {
                return res.send(true)
            })
        },

        deleteData : (req, res) => {
            let body = req.body

            model.api.deleteData(body, data => {
                return res.send(true)
            })
        },

        test : (req, res) => {
            return res.send('test')
        }
    }
  }