var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send([{bucketName: 'ADOG', emails: 'alex@alex.com'}, {bucketName: 'ADOG', emails: 'alex@alex.com'}]);
});

app.listen(3000);
console.log('Listening on port 3000...');
