// // Include the cluster module
// var cluster = require('cluster');
// // Code to run if we're in the master process
// if (cluster.isMaster) {
//     var cpuCount = require('os').cpus().length;
//     for (var i = 0; i < cpuCount; i += 1) {
//         cluster.fork();
//     }
//     // Listen for terminating workers
//     cluster.on('exit', function (worker) {
//         // Replace the terminated workers
//         console.log('Worker ' + worker.id + ' died :(');
//         cluster.fork();
//     });

// } else
{
	const server = require("./app");
	//print request url for development env
	if(!process.env.PORT) {
		var logger = require('restify-logger');
		server.use(logger('custom', {
			skip: function (req) {
			  return process.env.NODE_ENV === "test" || req.method === "OPTIONS" || req.url === "/status";
			}
		}));
	}
	var port = process.env.PORT || 8080;

	server.listen(port , function(){
	    console.log('%s listening at %s ', server.name , server.url);
	});
}

