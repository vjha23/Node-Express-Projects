const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;


// this function will take req.id from assignedid function
morgan.token('id', function getId(req) {
    return req.id
})

app.use(assignedId)

let accesLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


// midlleware use
app.use(morgan(':id :method :status :url '))
app.use(morgan(':id :method :status :url ', { stream: accesLogStream }))

app.get('/', (req, res) => {
    res.end('Morgan Logger App')
})

function assignedId(req, res, next) {
    req.id = uuidv4();
    next();

}

app.listen(port, () => { console.log('application started at port 3000'); })
