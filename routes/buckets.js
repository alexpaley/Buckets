var mongo = require('mongodb');

var Server = mongo.Server,
        DB = mongo.Db,
      BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new DB('bucketdb', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'bucketdb' database");
    db.collection('buckets', {strict: true}, function(err, collection) {
      if(err) {
        console.log("The 'buckets' collection doesn't exist. Creating with sample data...");
        populateDB();
      }
    });
  }
});

exports.findAll = function(req, res) {
  db.collection('buckets', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.addBucket = function(req, res) {
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

exports.updateBucket = function(req, res) {
    var id = req.params.id;
    var bucket = req.body;
    console.log('Updating bucket: ' + id);
    console.log(JSON.stringify(bucket));
    delete bucket._id;
    db.collection('buckets', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, bucket, {safe:true}, function(err, result) {
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

exports.deleteBucket = function(req, res) {
    var id = req.params.id;
    console.log('Deleting bucket: ' + id);
    db.collection('buckets', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

var populateDB = function() {

    var buckets = [
    // {
    //     bucketName: "Alex & Andrew",
    //     emails: "alexanderpaley@gmail.com, andrew@psyduk.com"
    // },
    // {
    //     bucketName: "Alex & Blake",
    //     emails: "alexanderpaley@gmail.com, me@blakeembrey.com"
    // }
    ];

    db.collection('buckets', function(err, collection) {
        collection.insert(buckets, {safe:true}, function(err, result) {});
    });
};


