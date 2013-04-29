var mongo  = require('mongodb');
       fs  = require('fs');

var db;

module.exports = function(_db) {
  db = _db;

  return uploads;
};

var uploads = {};

uploads.addFile = function(req, res) {
  db.collection('uploads', function(err, collection) {
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
        res.send(result[0]);
      });
    });
  });
};
