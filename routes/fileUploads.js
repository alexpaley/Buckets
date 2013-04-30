var mongo      = require('mongodb');
       fs      = require('fs');
    nodemailer = require("nodemailer");

var db;

module.exports = function(_db) {
  db = _db;

  return uploads;
};

var uploads = {};

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

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
        sendMail(req, res, data);
        console.log(req.files);
        console.log(process.env);
      });
    });
  });
};

var sendMail = function(req, res, data) {
  smtpTransport.sendMail({
     from: "Alex Paley <a@d.tt>",
     to: req.body.emailList,
     subject: "Alex just put a new item in your bucket!",
     text: "Download your attachment",
     attachments: [{
       filename: req.files.file.name,
       contents: new Buffer(data, 'base64')
     }]
  }, function(error, response){
     if(error) {
       console.log(error);
     } else {
       console.log("Message sent: " + response.message);
     }
  });
};
