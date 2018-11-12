
// Code to run if we're in a worker process
var restify = require('restify');
var server = restify.createServer({
	name : "myapp"
});
var CookieParser = require('restify-cookies');
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonBodyParser());
server.use(CookieParser.parse);

var config = require('./config'); // db conn included
config.connDB().catch(function(err){
	console.log('db connect', err);
	process.exit(-1);
}); // async connect to db

var Router = require('restify-router').Router;
var routerNeedAuth = new  Router();

////////////////////request handler///////////////////////
var usersApi = require("./users");
server.post({path : "/fg/api/v0/register.do" , version : '0.0.1'}, usersApi.register);
server.post({path : "/fg/api/v0/login.do" , version : '0.0.1'}, usersApi.login);
//////////////////////////////////////////////////////////

module.exports = server;
