const express = require('express');
const hbs = require('express-handlebars');
const carsService = require('./services/cars');

const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { home } = require('./controllers/home');
const { notFound } = require('./controllers/notFound');
const deleteCar = require('./controllers/removeCar');
const edit = require('./controllers/edit');


const app = express();

app.engine('hbs', hbs.create({
    extname: 'hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carsService());


app.get('/', home);
app.get('/about', about);

app.route('/create').get(create.get).post(create.post);
app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post);
app.route('/edit/:id').get(edit.get).post(edit.post);



app.get('/details/:id', details);

app.all('*', notFound)
app.listen(3000, () => console.log('listening on port 3000')); 