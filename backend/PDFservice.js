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
          //console.log("GVGFUyuduifsgfuisd: " + JSON.stringify(doc));
          json.items.push(doc);
        });
          //console.log(items);
          res(json);
        });
          //conn.fs.files.find();
        });
      });
    },
    runner: async function(){
      var x= await retrieveMetaData();
      console.log("PLLLLZZZZZ: "+ JSON.stringify(x));
    }
  }
