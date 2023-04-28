const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+ '/dist/index.html'));
  console.log(`🚀 Listening on ${server.address().port}`);
});
app.listen(process.env.PORT || 8080);