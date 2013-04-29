var fs = require('fs');

var mongo = require('mongodb');

var Server = mongo.Server,
        DB = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new DB('bucketdb', server);

exports.addFile = function(req, res) {
  db.open(function(err, db){
    db.collection('uploads', function(err, collection) {
      console.log(err);
      var upload = req.files.file;
      var document = {};
      document.name = upload.name;
      document.type = upload.type;
      document.size = upload.size;

      fs.readFile(upload.path, function(err, data){
        document.content = data;
        collection.insert(document, function(err, result) {
          if(err) {
            return res.send({'error':'An error has occurred'});
          }
          console.log(result[0]);
          res.send(result[0]);
        });
      });
    });
  });
};
