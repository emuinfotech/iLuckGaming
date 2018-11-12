var config = require("./config");
const moment = require("moment");

exports.register = async function(req, res, next){
    const md5    = require("md5");
    const username = req.body.username;
    const existUser = await config.db.collection("users").findOne({username});
    let result = {};
    if (existUser) {
        result.status = 1;
        result.message = "username is already exist.";
        res.send(201, result);
        return next();
    }
    const user = { ...req.body, password: md5(req.body.password), createdAt: moment().format("yyyy-mm-dd") };
    // user.playerId = generate playerId
    try{
        const r = await config.db.collection("users").save(user);
        result.status = 0;
        if(!r.ok){
            result.status = 1;
            result.message = "error occurred while inserting user to db";
        }
    }catch(exception) {
        result.status = 1;
        result.message = "some exception";
    }
    res.send(201, result);
    return next();
}

exports.login = async function(req, res, next){
    
    res.send(200,{});
    return next();
}

//only for test
exports._deleteUser = async function(username) {

}