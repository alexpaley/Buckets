var mongo  = require('mongodb');

var Server = mongo.Server,
        DB = mongo.Db,
      BSON = mongo.BSONPure;

var url = require('url');

var urlItems = url.parse(process.env.MONGO_DB);

var server = new Server(urlItems.hostname, urlItems.port, {auto_reconnect: true});
db_init = new DB(urlItems.path.substr(1), server, {safe: true});

var createApp = function(err, db) {
  if (err) { throw err; }

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
};

db_init.open(function(err, db) {

  if(urlItems.auth) {
    var user = urlItems.auth.split(':');
    db_init.authenticate(user[0], user[1], function (err) {
      createApp(err, db);
    });
  } else {
    createApp(null, db);
  }

});
