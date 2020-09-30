require('dotenv').config();
const {secret} = require('../config/default.json');
const User= require("../users");
const JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;

const  opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//setting the secret key defined in the config (database.js file)
opts.secretOrKey = secret ;

//JWT

module.exports = function(passport){ // will look in authorization header  for " JWT token_string..."
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        try{
            const user = await User.getUserById(jwt_payload.userId);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
        catch(err){
            return done(err, false);
        }
    }));
// facebook token and google token


};
