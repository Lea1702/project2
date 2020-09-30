const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require('https');
const fs = require('fs');

const cors=require('cors');
app.use(cors());

const passport = require("passport");
app.use(passport.initialize());
require("./passportConfig/passport")(passport);

// const port = process.env.PORT || 3000;
const port =  3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute=  require('./routes/main');
app.use('/user', userRoute);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
