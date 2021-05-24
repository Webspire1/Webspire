//main.js file
const axios = require('axios');
const e = require('express');
const url = require("url");

module.exports = function(app, viewsDir) {

    app.get("/", function(req, res){
        res.render(viewsDir + "index.html", { 
            title: 'Webspire - Index',
            inner: false,
            contact_address: 'webspire-admins@hash.fyi'
        });
    });

    app.get("/portfolio", function(req, res) {
        res.render(viewsDir + "portfolio-details.html", { 
            title: 'Portfolio Details - Webspire', 
            inner: true
        })
    });

    app.post("/subscribe", function(req, res) {
        const email = req.body.email;
        console.log(`Subscribing ${email}...`)

        // Mailchimp subscribe to Webspire
        const data = {
            members: [
                {
                    email_address: email,
                    status: 'subscribed'
                }
            ]
        };
        const mailchimp_url = "https://us6.api.mailchimp.com/3.0/lists/96f4828d1e";
        axios.post(mailchimp_url, data, { headers: {Authorization: 'auth ' + process.env.MAILCHIMP_API_KEY}})
            .then(response => {
                if (response.status === 200) {
                    console.log(`${email} Subscribed`);
                    res.redirect(url.format({
                        pathname: '/subscribed',
                        query: { email }
                    }));
                } else {
                    console.log(response);
                    res.send('Fail to subscribe.');
                }
            }).catch(err => {
                console.error(err);
                res.send('Fail to subscribe.');
            });
    });

    app.get("/subscribed", function(req, res){
        res.render(viewsDir + "subscribed.html", { 
            title: 'Subscribed to Webspire Newsletter',
            inner: true,
            email: req.query.email
        });
    });

};