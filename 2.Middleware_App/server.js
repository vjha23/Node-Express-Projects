const express = require('express');
const path = require('path');
const fs = require('fs');
const e = require('express');
const app = express();

const Port = process.env.PORT || 3000;

// now using the middleware
app.use(function (req, res, next) {
    console.log('Request date ' + new Date());
    next();
})

// now serving static files 
app.use(function (req, res, next) {
    var filepath = path.join(__dirname, 'static', req.url);
    fs.stat(filepath, function (err, fileinfo) {
        if (err) {
            next;
            return
        }
        if (fileinfo.isFile) {
            res.sendFile(filepath);
        } else {
            next();
        }
    })
})

// 404 middleware handler
app.use(function (req, res) {
    res.status(404);
    res.send('File not found');
})

app.listen(Port, () => { console.log('application started at port 3000'); })