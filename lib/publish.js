'use strict';

var request = require('request');
var fs = require('fs');

function publish(filepath, url) {
  var req = request.post(url, function(err, resp, body) {
    if (err) {
      console.log(err);
      console.log('Error!');
    } else {
      console.log('URL: ' + body);
    }
  });
  var form = req.form();
  form.append('file', fs.createReadStream(filepath));
}

module.exports = publish;
