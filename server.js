var express = require('express'),
    buckets = require('./routes/buckets');

var app = express();

var __root = function() {
  return require('path').normalize(__dirname);
};

app.configure(function() {
  app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser());
});

app.use(express.static( __root() +'/public'));

app.get("/api", buckets.findAll);
app.post("/api", buckets.addBucket);
app.put("/api/:id", buckets.updateBucket);
app.delete("/api/:id", buckets.deleteBucket);

app.listen(3000);
console.log('Listening on port 3000...');
