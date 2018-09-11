var express = require('express');
var fs=require('fs');
var Pdfservice = require('./Pdfservice');
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');
var pdfPath = path.join('test.pdf');
var query=require("querystring");
var app = express();

// Works Outside
// NOTE : This works on my enviroment, bits and bobs must be changed to work with the front end

app.get('/', function(req, res){
    fs.readFile('testForm.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
})
app.post('/api/add/', function (req, res) {
    req.on("data", function (data) {
        form = query.parse(data.toString());
        console.log("file name:" +form.fileName);
        console.log("file:" +form.file);
        console.log("author:" +form.author);
        console.log("tags:" +form.tags);
        Pdfservice.addToDataBase(form.fileName, form.file, form.author, form.tags);
        res.end();
    });
})

app.get('/viewFileWithID', function (req, res) {
        // var fileName = req.params.id
        var id = '5b97aa674c303f80d8a6c4c3';
        Pdfservice.getPdfByID(id, res);
    }
)

app.delete('/deleteFileWithID', function (req, res) {
        var id = '5b97aa674c303f80d8a6c4c3';
        Pdfservice.deletePdfByID(id, res);
        res.end();
    }
)


app.listen('3002');