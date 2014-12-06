var exec = require('child_process').exec;
var fs = require('fs');

module.exports = {
	generate: function(address, callback){
		exec('openssl genrsa -out private' + address + '.pem 2048 &> /dev/null', function(){
			exec('openssl rsa -in private' + address + '.pem -pubout -out public' + address + ' &> /dev/null', function(){
				fs.readFile("private" + address + ".pem", "utf8", function(err, data){
					fs.readFile("public" + address, "utf8", function(err2, data2){
						callback({
							public: data2,
							private: data
						});
						fs.unlink("public" + address, function(){});
						fs.unlink("private" + address + ".pem", function(){});
					});
				});
			});
		});
	}
}
