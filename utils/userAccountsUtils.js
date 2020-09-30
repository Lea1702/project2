require('dotenv').config();
const {emailAuth, emailAuthPassword} = require('../config/default.json')
const nodemailer = require("nodemailer");
const crypto = require("crypto");
var bcrypt = require('bcryptjs');

module.exports.generateToken = async function() {
    const token = await new Promise((res, rej) => {
        crypto.randomBytes(20,function(err, buf){
            if(err) rej(err)
            res(buf.toString('hex'));
        });
    });
    return token;
};

module.exports.hashPassword = async function(password){
    const hashedPassword = await new Promise((res, rej) => {
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) rej(err);
                res(hash);
            })
        })
    });
    return hashedPassword;
};

module.exports.sendUserEmailVerification = async function(email, token, userId){
    return new Promise((res, rej) =>{
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: emailAuth,
                pass:emailAuthPassword
            }
        });
        var mailOptions =  {
            to: email,
            from: 'goods4life11@gmail.com',
            subject: 'Verify your email',
            text: `Verify your email account at https://someClientUrl/verify?token=${token}&userId=${userId}`
        };
        smtpTransport.sendMail(mailOptions, function(err){
            if(err) rej('failed to send verification mail');
            else{
                res();
            }
        })
    })
};

module.exports.sendResetPasswordEmail = async function(email, token, userId){
    return new Promise((res, rej) => {
        const smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: emailAuth,
                pass: emailAuthPassword
            }
        });
        var mailOptions = {
            to: email,
            from: 'goods4life11@gmail.com',
            subject: 'Password Reset Beam',
            text: `You can change your password at https://someClientUrl/resetPassword?token=${token}&userId=${userId}`
        };
        smtpTransport.sendMail(mailOptions, function(err){
            if(err) rej('failed to send the mail');
            else{
                res();
            }
        })
    })
};

