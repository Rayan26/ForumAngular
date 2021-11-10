const config = require('./config');
const auth = require("./auth");
const queries = require("./mysqlQueries");
const {sendError, sendMessage} = require("./message");

async function getPosts(req, res) {
    const session = auth.getSession(req);
    const userId = auth.getUserId(session);
    auth.setSessionCookie(req, res, session);
    if (typeof req.body.idTopic === 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée idTopic');
    const idTopic = req.body.idTopic;
    const posts = await queries.getPostsQuery(idTopic);
    sendMessage(res, posts);
}

module.exports = getPosts;
