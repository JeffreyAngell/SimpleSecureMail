var mongoose = require('mongoose');
var keypairgen = require('../KeypairGen/keypairgen');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', function(){
	console.error("Error thrown; please verify that your database is running.");
	process.exit(0);
});

var keypairSchema = mongoose.Schema({ email: String, public: String, private: String, expireAt: {type: Date, default: new Date(new Date().getTime() + 1000*60*60*24*2)} });

var keypair = mongoose.model('keypair', keypairSchema);

module.exports = {
	getPublic: function(address, callback){
		var query = keypair.where({"email": address});
		query.findOne(function (err, pair){
			if(!err){
				if(pair == null){
					keypairgen.generate(address, function(mypair){
						mypair.email = address;
						var spair = new keypair(mypair);
						spair.save(function(err){});
						callback(spair.public);
					});
				} else{
					if(pair.expireAt.getTime() - new Date().getTime() < 1000*60*60*24*3){
						pair.expireAt = new Date(new Date().getTime() + 1000*60*60*24*3);
						var spair = new keypair(pair);
						spair.update(function(err){});
					}
					callback(pair.public);
				}
			} else{
				console.log("Error thrown!");
				callback(null);
			}
		});
	},

	getPrivate: function(address, callback){
		var query = keypair.where({"email": address});
		query.findOne(function (err, pair){
			if(!err){
				if(pair == null){
					keypairgen.generate(address, function(mypair){
						mypair.email = address;
						var spair = new keypair(mypair);
						spair.save(function(err){});
						callback(spair.private);
					});
				} else{
					if(pair.expireAt.getTime() - new Date().getTime() < 1000*60*60*24*3){
						pair.expireAt = new Date(new Date().getTime() + 1000*60*60*24*3);
						var spair = new keypair(pair);
						spair.update(function(err){});
					}
					callback(pair.private);
				}
			} else{
				console.log("Error thrown!");
				callback(null);
			}
		});
	},
	
	delete: function(address, callback){
		keypair.find({"email": address}).remove().exec();
		callback();
	}
};
