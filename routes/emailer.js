var fs         = require('fs'),
    mongo      = require('mongodb'),
    nodemailer = require("nodemailer");

// var db;

// module.exports = function(_db) {
//   db = _db;

//   return uploads;
// };

// var uploads = {};

// create reusable transport method (opens pool of SMTP connections)
var transport = nodemailer.createTransport("SMTP", {smtp_options});

// setup e-mail data with unicode symbols
var mailOptions = {
  from: "Alex Paley <a@d.tt>", // sender address
  to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers coming from selected buckets
  subject: "From your Bucket 'NAME OF BUCKET' with Alex", // Subject line
  text: "Sharing has never been easier. Get a bucket too at www.bucket.jit.su!", // plaintext body
  html: "<b>Sharing has never been easier. Get a bucket too at www.bucket.jit.su!</b>" // html body
};

// send mail with defined transport object
transport.sendMail(mailOptions, function(error, response){
  if(error) {
      console.log(error);
  } else {
      console.log("Message sent: " + response.message);
  }
});

// var smtpTransport = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: {
//         user: "a@d.tt",
//         pass: ""
//     }
// });