var express = require("express");
var https = require("https");
var path = require("path");

var app = express();
var staticRouter = express.Router();
var apiRouter = express.Router();

var keys = require("./custom/KeyAccess/keyaccess");

staticRouter.use(express.static("../public"));

apiRouter.get("/public/:email", function(req, res){
	keys.getPublic(req.params.email, function(key){
		res.status(200).json({ "key": key});
	});
});

apiRouter.use("/private", function(req, res, next){
	if(req.headers["authorization"] === undefined){
		res.status(200).json({"redirect": "https://accounts.google.com/o/oauth2/auth?" + 			"response_type=token&" +
			"client_id=974406176197-fs442gf80elneq6mcotdug4nh4fnf14d.apps.googleusercontent.com&" + 
			"redirect_uri=http://localhost:8080/&" + 
			"scope=email&state=asdf"});
	} else{
		var options = {
			host: "www.googleapis.com",
			path: "/oauth2/v1/tokeninfo?access_token=" + req.headers["authorization"].split(" ")[1]
		}
		https.request(options, function(response){
			body = "";
			response.on("data", function(data){
				body += data;
				user = JSON.parse(body);
				if(user.verified_email == true)
					keys.getPrivate(user.email, function(key){
						res.status(200).json({ "key": key});
					});
				else
					res.status(401).send("Failed Authorization");
			});
		}).end();
	}
});

apiRouter.get("/private/:email", function(req, res){
	keys.getPrivate(req.params.email, function(key){
		res.status(200).json({ "key": key});
	});
});

apiRouter.get("/me", function(req, res){
	var options = {
		host: "www.googleapis.com",
		path: "/oauth2/v1/tokeninfo?access_token=" + req.headers["authorization"].split(" ")[1]
	}
	https.request(options, function(response){
		body = "";
		response.on("data", function(data){
			body += data;
			user = JSON.parse(body);
			if(user.verified_email == true)
				res.status(200).json({"email":user.email});
			else
				res.status(401).send("Failed Authorization");
		});
	}).end();
});

app.use("/api", apiRouter);
app.use("/", staticRouter);
app.get("*", function(req, res){
	res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.listen(8080);
