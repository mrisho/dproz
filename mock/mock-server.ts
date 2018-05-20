const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 3000;
var admin = express();

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.post('/api/users',  (req, res) => {
    res.send(req.body);
});

app.post('/api/users/login',  (req, res) => {
    res.send({
        firstName: "Varun",
        lastName: "Sharma",
        userReferenceId: "434cefdfrf45fcezmuiyut",
        "user-token": "x4refceef343w",
        profilePicture: "string"
      });
});

app.get('/api/users/verification/:token',  (req, res) => {
    res.send();
});

app.get('/api/users/forgot-password',  (req, res) => {
    res.send({});
});

app.listen(port);

console.log(`Mock server running on port: ${port}`);

