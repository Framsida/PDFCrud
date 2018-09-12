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
    // for ash to test stuff do not need it
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

app.get('/api/viewFileWithID/:id', function (req, res) {
    var id = req.params.id
    Pdfservice.getPdfByID(id, res);
})

app.delete('/api/deleteFileWithID', function (req, res) {
        req.on("data", function (data) {
            form = query.parse(data.toString());
            Pdfservice.deletePdfByID(form.id, res);
            res.end();
        });
})

app.get('/api/getDetails/', async function (req, res) {
    console.log("Runnning");
    //console.log(Pdfservice.retrieveMetaData());
    var x = await Pdfservice.retrieveMetaData();
    console.log(x);
    res.end();
})

app.put('/api/updatePdf/', function (req, res) {
    // needs to have id and data and new data inputted
    req.on("data", function (data) {
        form = query.parse(data.toString());
        Pdfservice.updatePDFbyID(form.id, form.data, form.field)
    });
} )



app.listen('3002');