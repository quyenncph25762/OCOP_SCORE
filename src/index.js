const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const route = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Midleware
app.use(bodyParser.urlencoded({ extended: false }));

// helpers
Handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
});


//Connect to DB
db.connection;

//static file
app.use(express.static(path.join(__dirname, 'public'))); //tự load các file tĩnh trong thư mục public

//Template engine
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//Morgan
app.use(morgan('combined'));
app.use('/Uploads', express.static('Uploads'))
// app.use(express.json);

//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
