const express = require('express');
const expresshbs = require('express-handlebars');
const path = require('path');

//Initialize
const app = express();

//Settings 
app.set('views', path.join(__dirname, 'views'));

//Engine of boiler plates
app.engine('.hbs', expresshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views',), 'layouts'),
    partialsDir: path.join(app.get('views',), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//MIddleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server 
app.listen(5000, () => {
    console.log('Server on port: ', 5000);
});