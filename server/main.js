var express = require("express");

var app = express();
var router = express.Router();

router.get("/", function(req, res){
	res.status = 200;
	res.json({ "asdf": "qwer"});
});

app.use("/", router);

app.listen(8080);
