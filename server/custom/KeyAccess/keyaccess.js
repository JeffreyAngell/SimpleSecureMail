var mongoose = require('mongoose');
var keypairgen = require('../KeypairGen/keypairgen');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', function(){
	console.error("Error thrown; please verify that your database is running.");
	process.exit(0);
});

var keypairSchema = mongoose.Schema({ email: String, public: String, private: String });

var keypair = mongoose.model('keypair', keypairSchema);

module.exports = {
	getPublic: function(address, callback){
		 keypair.findOne({'email': address}, 'public', function (err, pair){
			if(!err){
				if(pair == null){
					keypairgen.generate(address, function(mypair){
						mypair.email = address;
						var spair = new keypair(mypair);
						spair.save(function(err){});
						callback(spair.public);
					});
				} else{
					callback(pair.public);
				}
			} else{
				console.log("Error thrown!");
				callback(null);
			}
		});
	},

	getPrivate: function(address, callback){
		keypair.findOne({'email': address}, 'private', function (err, pair){
			if(!err){
				if(pair == null){
					keypairgen.generate(address, function(mypair){
						mypair.email = address;
						var spair = new keypair(mypair);
						spair.save(function(err){});
						callback(spair.private);
					});
				} else{
					callback(pair.private);
				}
			} else{
				console.log("Error thrown!");
				callback(null);
			}
		});
	}
};
