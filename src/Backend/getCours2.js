const config = require('./config');
const auth = require("./auth");
const queries = require("./mysqlQueries");
const {sendError, sendMessage} = require("./message");

async function getCourses(req, res) {
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);
    auth.setSessionCookie(req, res, session);
    if (typeof req.body.idUser === 'undefined')
        return sendError(res, "Vous n'avez pas envoyé la donnée idUser");
    const idUser = req.body.idUser;
    const cours = await queries.getCoursesQueries(idUser);
    sendMessage(res, cours);
}
module.exports = getCourses;
