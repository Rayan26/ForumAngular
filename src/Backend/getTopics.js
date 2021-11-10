const config = require('./config');
const auth = require("./auth");
const queries = require("./mysqlQueries");
const {sendError, sendMessage} = require("./message");

async function getTopics(req, res) {
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);
    auth.setSessionCookie(req, res, session);
    if (typeof req.body.idUser === 'undefined')
        return sendError(res, "Vous n'avez pas envoyé la donnée idUser");
    if (typeof req.body.idCours === 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée idCours');
    const idUser = req.body.idUser;
    const idCours = req.body.idCours;
    const topics = await queries.getTopicsQueries(idUser, idCours);
    sendMessage(res, topics);
}
module.exports = getTopics;
