//main.js file
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
        console.log("Subscribed");
        res.send("OK");
    })

};