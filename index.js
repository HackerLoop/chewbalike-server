var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is Chewbalike server');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'chewbalike_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// handler receiving messages
app.post('/webhook', function (req, res) {
  chewbaLike();
  res.send('Chewbalike!!!!');
  console.log('Chewbacca likes this POST request');
});

function chewbaLike() {
    request({
        url: 'https://cloud.arest.io/32465879/digital/4/0',
        method: 'get',

    }, function(error, response, body) {
        if (error) {
            console.log('Error sending like: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};
