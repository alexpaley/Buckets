var express = require('express'),
    buckets = require('./routes/buckets');

var app = express();

app.get('/', buckets.findAll);
app.post('/', buckets.addBucket);
app.put('/', buckets.updateBucket);
app.delete('/', buckets.deleteBucket);

app.listen(3000);
console.log('Listening on port 3000...');
