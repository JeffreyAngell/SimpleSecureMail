var express = require("express");

var app = express();
var staticRouter = express.Router();
var apiRouter = express.Router();

staticRouter.use(express.static("../public"));

apiRouter.get("/public/:email", function(req, res){
	res.status = 200;
	res.json({ "key": "something weird looking"});
});

apiRouter.get("/private/:email", function(req, res){
	res.status = 200;
	res.json({ "key": "haha, like we'd tell you the private key!"});
});

app.use("/api", apiRouter);
app.use("/", staticRouter);

app.listen(8080);
