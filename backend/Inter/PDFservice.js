var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');
var Grid = require('gridfs-stream');
var fs = require('fs');
var pdfPath = path.join('test.pdf');
Grid.mongo = mongoose.mongo;

module.exports = {
    addToDataBase: function (filename, file, author, tags) {
        mongoose.connect('mongodb://testing:testing1@ds151292.mlab.com:51292/devtesting');
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
    }
}



