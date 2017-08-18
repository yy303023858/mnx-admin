var express = require('express')
// var config = require('./config/index')
// var opn = require('opn')


// var port = process.env.PORT || config.build.port

var port = 18080

var app = express()



app.use(express.static('./dist'))

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})