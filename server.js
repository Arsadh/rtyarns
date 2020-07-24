const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT;
const path = require('path');
let ejs = require('ejs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth : {
        api_key : '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' ,
    }
}));


const translate = require('@vitalets/google-translate-api');
 
translate('Welcome to Arshad Yarns', {to: 'ta'}).then(res => {
    console.log(res.text);
    console.log(res.from.language.iso);
}).catch(err => {
    console.error(err);
});


app.use(express.urlencoded({
    extended : false,
}));

app.use(express.json());

app.get('/', (req,res) => {
    res.render(path.join(__dirname, 'index.ejs'))
})

app.post('/email', (req,res) => {
     console.log(JSON.parse(JSON.stringify(req.body)))
     transporter.sendMail({
         to : 'mohamedarsadh7@gmail.com',
         from : 'mohamedarsadh7@gmail.com',
         subject : 'Hurray',
         html : '<h1> Sent </h1>'
     });
})


app.listen(port, ()=> console.log('listening in port', port));