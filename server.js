var mongo  = require('mongodb');

var Server = mongo.Server,
        DB = mongo.Db,
      BSON = mongo.BSONPure;

url = require('url');

urlItems = url.parse(process.env.MONGO_DB);

var server = new Server(urlItems.hostname, urlItems.port, {auto_reconnect: true});
db_init = new DB('bucketdb', server);

user = urlItems.auth.split(':');

db_init.open(function(err, db) {

  db_init.authenticate(user[0], user[1], function(err, res) {

    var express = require('express'),
        buckets = require('./routes/buckets')(db);
        uploads = require('./routes/fileUploads')(db);
        // mailman = require('./routes/emailer')(db);

    var app = express();

    var __root = function() {
      return require('path').normalize(__dirname);
    };

    app.configure(function() {
      app.use(express.logger('dev'));
      app.use(express.bodyParser());
    });

    app.use(express.static( __root() +'/public'));

    app.get("/api", buckets.findAll);
    app.post("/api", buckets.addBucket);
    app.put("/api/:id", buckets.updateBucket);
    app.delete("/api/:id", buckets.deleteBucket);

    app.post("/target", uploads.addFile);

    app.listen(3000);
    console.log('Listening on port 3000...');
  });
});
