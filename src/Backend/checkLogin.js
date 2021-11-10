const config = require('./config');
const auth = require("./auth");
const queries = require("./mysqlQueries");
const {sendError, sendMessage} = require("./message");

async function checkLogin(req, res) {
    if (typeof req.body.login === 'undefined')
        return sendError(res, 'error');
    if (typeof req.body.password === 'undefined')
        return sendError(res, 'error');
    const login = req.body.login;
    const password = req.body.password;
    const id = await queries.connectPost(login,password);
        if ( id > 0){
            const payload={userId:id, midExp:0}
            auth.setSessionCookie(req, res, payload);
            sendMessage(res, "");
        }else sendError(res,"login/password invalide")
}

module.exports = checkLogin;
