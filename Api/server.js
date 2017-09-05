var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var history = [];
var users = [];

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// test
app.get('/', function (req, res) {
    res.json({ message: 'it works...' });
});

// history
app.get('/history', function (req, res) {
    res.send(history);
});

app.post('/history', function (req, res) {
    var date = new Date();

    console.log(req.body);
    history.push({ message: req.body.message, username: req.body.username, date: date });

    res.json({ message: 'History created!' });
});

// users
app.get('/users', function (req, res) {
    res.send(users);
});

app.get('/users/:id', function (req, res) {
    for (var i = 0; users.length > 0; i++) {
        if (users[i] && users[i].id === req.params.id) {
            res.send({ username: users[i].username, id: users[i].id });
        }
    }
});

app.post('/users', function (req, res) {
    console.log(req.body);
    users.push({ username: req.body.username, id: users.length + 1 });

    res.json({ username: req.body.username });
});

app.listen(port);
console.log('Listening on port: ' + port);
