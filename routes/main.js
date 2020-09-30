const express = require('express');
const app = express();
mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const router = express.Router();
const User = require('../users.js');
const passport = require("passport");
const uuid = require("uuid");

function initialize () {
}


router.post('/register', async function (req, res) {
    const { email, password } = req.body;
    try {
        await User.saveUser(email, password);
        res.status(200).json({
            message: 'Succeffuly signed up'
        })
    }
    catch (err) {
        res.status(500).json({ message: `Failed at registration, ${err}` });
    }
});   


router.post('/login', async function (req, res) {
    console.log("login");
    const { email, password } = req.body;
    console.log("email : ", email);
    console.log("password : ", password);
    try {
        const user = await User.login(email, password);
        res.status(200).json({
            message: "Login Success",
            user: email
        });
    }
    catch (error) {
        res.status(500).json({ message: `${error}` });
    }
});


app.get('/doesUserExist/:email', function (req, res) {
    let email = req.params.email;
    connection.query(`SELECT * from users where email='${email}'`, function (err, result) {
        if (err) throw err;
        if (result.length)
            res.status(200).send(true);
        })
        res.status(200).send(false);
});

app.get('/isLoginValid/:email/:password', function (req, res) {
    let email = req.params.email;
    let password = req.params.passqord;
    connection.query(`SELECT * from users where email='${email}' and password='${password}'`, 
    function (err, result) {
        if (err) throw err;
        if (result.length)
            res.status(200).send(true);
        res.status(200).send(false);});
    });

app.post('/registerUser', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    connection.query(`INSERT INTO users VALUES ('${email}', '${password}')`, function (err, result) {
        if (err) throw err;
        res.status(200).send("User added");
    });
});

app.get('/getClips/:email', function (req, res) {
    let email = req.params.email;
    connection.query(`SELECT urls from clips where email='${email}'`, 
    function (err, result) {
        if (err) throw err;
        res.status(200).send(result.urls);
    });
});

module.exports = router;


// app.listen(8080, function (){
//     initialize();
// });
