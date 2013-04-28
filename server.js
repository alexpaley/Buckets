var express = require('express');
var app = express();

app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/uploads" }));


app.get('/file/post', function(req, res){
  res.send('hello world');
});

app.listen(3000);
console.log("Express server listening on port " + app.get('port'));

url: "/file/post"