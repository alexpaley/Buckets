var mongo  = require('mongodb');

var db;

module.exports = function(_db) {
  db = _db;

  return buckets;
};

var buckets = {};

buckets.findAll = function(req, res) {
  db.collection('buckets', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

buckets.addBucket = function(req, res) {
  var bucket = req.body;
  console.log('Adding bucket: ' + JSON.stringify(bucket));
  db.collection('buckets', function(err, collection) {
    collection.insert(bucket, {safe:true}, function(err, result) {
      if(err) {
        return res.send({'error':'An error has occurred'});
      }

      console.log('Success: ' + JSON.stringify(result[0]));
      res.send(result[0]);
    });
  });
};

buckets.updateBucket = function(req, res) {
  var id = req.params.id;
  var bucket = req.body;
  console.log('Updating bucket: ' + id);
  console.log(JSON.stringify(bucket));
  delete bucket._id;
  db.collection('buckets', function(err, collection) {
      collection.update({'_id':new mongo.ObjectID(id)}, bucket, {safe:true}, function(err, result) {
          if (err) {
              console.log('Error updating bucket: ' + err);
              res.send({'error':'An error has occurred'});
          } else {
              console.log('' + result + ' document(s) updated');
              res.send(bucket);
          }
      });
  });
};

buckets.deleteBucket = function(req, res) {
  var id = req.params.id;
  console.log('Deleting bucket: ' + id);
  db.collection('buckets', function(err, collection) {
    console.log(mongo);
    collection.remove({'_id':new mongo.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
          res.send({'error':'An error has occurred - ' + err});
      } else {
          console.log('' + result + ' document(s) deleted');
          res.send(req.body);
      }
    });
  });
};
