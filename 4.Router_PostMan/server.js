const express = require('express');
const app = express();
const route = require('./router')
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');

const port = 3000;

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

//calling middleware
app.use('/api', route)


// home route
app.get('/', (req, res) => {
    res.send('routing app')
})

app.listen(port, () => { console.log('application running at port 3000'); })