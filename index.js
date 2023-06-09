// index.js
// where your node app starts

// init project
require('dotenv').config();

var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {

  // console.log(type(new Date(req.params.date)));
  let dateParam = isNaN(Number(req.params.date)) ? req.params.date : Number(req.params.date);
  let date = new Date(dateParam);
  console.log(dateParam);

  if (dateParam) {

    if (isNaN(Number(date))) {
      res.json({
        'error': "Invalid Date"
      });
    }

    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString(),
    });
  }

  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString(),
  })


});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
