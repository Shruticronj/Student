"use strict";
let config = require('./config/environment');
let express = require('express')
let app = express()
let db=require('./config/db')

require('./config/express')(app)
require('./routes/route.js')(app)

function startServer() {
	app.listen(config.port, config.ip, function() {
		console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});
}
db.connection.sync({force : config.regenerateDB})
//db.connection.sync({force : true})
	.then(()=>{
		// console.log("seedDb",config.seedDB);
		// console.log("regenerateDB",config.regenerateDB);
		if (config.seedDB) {
			var { seed } = require('./seed');
			seed().then(function() {
				console.log("seeding completed!");
				startServer();
				console.log('Server Started!!');
			})
		} else{
			startServer();
			console.log('Server Started!!');
		}
		return null;
	})
	.catch((err)=>{
		console.log(err.stack);
		console.log('Server failed to start due to error: %s', err.stack);
	});
	
exports = module.exports = app;
