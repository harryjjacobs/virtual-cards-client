var path = require('path');
var express = require('express');

var app = Express();

app.set('port', process.env.PORT || 6565);

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), function() {
  console.log('Running at http://localhost:' + app.get('port'));
});