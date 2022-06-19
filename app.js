const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//CONNECT TO THE DB MONGOOOSE
const db = 'mongodb+srv://lola:lola2208@nodeapp.keegb.mongodb.net/node-app?retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//SET THE TEMPLATES ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));


//BASIC ROUTES

app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.use((req, res) => {
  res.status('404').render('404')
});

//BLOG ROUTES 
app.use('/blogs', blogRoutes);