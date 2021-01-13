const express = require('express');
const app = express();
const path = require('path')
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = require('./router.js');

const Port = process.env.Port || 3000;

// bodyparser module is responsible for parsing the incoming request bodys in the middleware before you use it 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs');

// inform the server to use static file (css file)
app.use('/static', express.static(path.join(__dirname, 'public')));

// calling middleware method
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route', router);

// homeroute
app.get('/', (req, res) => {
    res.render('base', { title: 'Login System' });
})

app.listen(Port, () => { console.log('application started at port 3000'); })