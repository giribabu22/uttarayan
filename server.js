require('./acces_data_tables.js');
const express = require('express');
const { verification } = require('./auth/sct')
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.json());

app.use('/sign-up', require('./routes/registation'))
app.use('/login', require('./routes/login'))
app.use('/home/new_post', verification, require('./routes/new_post'))
app.use('/feedback', verification, require('./routes/feedback'))
app.use('/profile', verification, require('./routes/profile'))
app.use('/home', verification, require('./routes/home'))
app.use('/comments', verification, require('./routes/comments'))
app.use('/delete', verification, require('./routes/delete'))

app.use('/', require('./routes/registation'))
app.get('/logout',(req,res)=>{
    res.cookie.user = undefined
    res.redirect('/login')
})
app.listen(port);