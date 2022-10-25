const express = require('express')
const { register } = require('../acces_data_tables')
const routers = express.Router()
const { creating_token } = require('../auth/sct')

routers.use(express.urlencoded());

routers.route('')
    .get((req, res) => {
        res.render('registation')
    })
    .post(async (req, res) => {
        req.body['password'] = await creating_token(req.body.password)
        await register.create(req.body).then((bool) => {
            if (bool) {
                res.send("notification!! your account has be created!!  <a href='/login'>login</a> <style> *{margin:10%; font-size:100px;}")

            } else {
                res.send('no not yet!!')
            }
        }).catch((errors) => {
            if (errors.message == 'Validation error') {
                res.send("notification!! you have account with this email!!  <a href='/login'>login</a> <style> *{margin:10%; font-size:100px;}")
            } else {
                res.send('notification !! error :' + errors.message +"<a href='/login'>login</a> <style> *{margin:10%; font-size:100px;}")
            }
        });
    })

module.exports = routers