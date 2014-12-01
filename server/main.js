var express = require("express");

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

apiRouter.get("/private/:email", function(req, res){
	keys.getPrivate(req.params.email, function(key){
		res.status(200).json({ "key": key});
	});
});

app.use("/api", apiRouter);
app.use("/", staticRouter);

app.listen(8080);
