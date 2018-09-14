var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');
var pdfPath = path.join('test.pdf');
const f = require('util').format;
var Busboy = require('busboy');
var query=require("querystring");
var http = require('http'),
    inspect = require('util').inspect;



// Retrieve
var MongoClient = require('mongodb').MongoClient;
Grid.mongo = mongoose.mongo;


module.exports = {
    addToDatabaseButItWorksHopefully: function(req, res) {
        mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
        console.log(req.body.tags);
        var busboy = new Busboy({ headers: req.headers });
        var conn = mongoose.connection;
        var stuff = {};
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            stuff[fieldname] = val;
            console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });
        console.log(stuff);
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            conn.once('open', function () {

                var gfs = Grid(conn.db);
                var writestream = gfs.createWriteStream({
                    filename: stuff.fileName,
                    metadata: {
                        author: stuff.author,
                        tags: stuff.tags,
                    }
                });
                file.pipe(writestream);
            });
            
        });
        busboy.on('finish', function() {
            console.log(stuff);
        });

        req.pipe(busboy);
    },
    addToDataBase: function (filename, file, author, tags) {
        mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
        console.log(file);
        var conn = mongoose.connection;
        conn.once('open', function () {
            var gfs = Grid(conn.db);
            var writestream = gfs.createWriteStream({
                filename: filename,
                metadata: {
                    author: author,
                    tags: tags,
                }
            });
            fs.createReadStream(file).pipe(writestream);
        });
    },
    getPdfByID: function (id, res) {
        mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
        var conn = mongoose.connection;
        conn.once('open', function () {
            var gfs = Grid(conn.db);
            gfs.createReadStream({_id : id}).pipe(res);
        });
    },
    deletePdfByID: function(id, res){
        mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
        var conn = mongoose.connection;
        conn.once('open', function () {
            var gfs = Grid(conn.db);
            gfs.remove({ _id: id });
        });
    },
    retrieveMetaData: function (){
        return new Promise((res,rej) =>{
            mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
            var conn = mongoose.connection;
            var json={"items":[]};
            var doc;
            conn.once('open', function () {
                conn.collection("fs.files").find({ })
                    .toArray(function(err, items){
                        items.forEach((x) => {
                            doc= {
                                "id": x._id,
                                "Title": x.filename,
                                "Tags": x.metadata.tags,
                                "Date": x.uploadDate
                            }
                            json.items.push(doc);
                        });
                        res(json);
                    });
            });
        });
    },
    updatePDFbyID: function (id, title, tags){
        console.log(title);
        console.log(tags);        console.log(mongoose.mongo.ObjectId(id));

        mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
        var conn = mongoose.connection;
        conn.once('open', async function () {
            await conn.collection("fs.files").update({"_id": mongoose.mongo.ObjectId(id)}, {'$set': {"title": title, "tags" : tags}});
        });
    }
}



