const config = require('./config');
const auth = require("./auth");
const queries = require("./mysqlQueries");
const {sendError, sendMessage} = require("./message");

async function saveNewTopic(req, res) {
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);
    auth.setSessionCookie(req, res, session);
    if (typeof req.body.idCours === 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée idCours');
    if (typeof req.body.newTopic === 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée newTopic');
    if (typeof req.body.idUser === 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée idUser');
    const newTitre = req.body.newTopic;
    const idCours = req.body.idCours;
    const idUser = req.body.idUser;
    console.log("salut");

    const newid = await queries.saveNewTopicQuery(newTitre, idCours, idUser);
    sendMessage(res, newid);
}

module.exports = saveNewTopic;
