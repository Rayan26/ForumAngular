// ici, on se connecte à la base de données. Ainsi, on pourra utiliser
// db (l'équivalent de PDO) pour réaliser les requêtes mySQL.
const config = require('./config');
const db = require ('./mysqlConnect');

// chaque requête correspond à une fonction qui renverra ce que l'on appelle
// une Promise (promesse). Une promesse est un objet qui contient une
// fonction (dont on sait qu'elle sera exécutée dans le futur). La promesse
// est renvoyée avant que la fonction ne soit exécutée (fonctionnement donc
// asynchrone). Quand la fonction a été exécutée, la callback appelle la
// fonction resolve qui indique à la promesse qu'elle peut renvoyer la
// réponse en question. Dans le fichier getCours1.js, les lignes 40 et 41
// (celles avec les await) récupèrent ces Promises. L'opérateur await attend
// alors que la promesse soit résolue (resolve) et récupère alors la
// réponse. Ainsi, même si tout ce fonctionnement est asynchrone, la variable
// idsPetitsCours de la ligne 40 du fichier getCours1.js récupérera le
// résultat de la requête mysql quand celui-ci aura été renvoyé par le
// serveur MySQL.

function connectPost(login,password){
    const query =`SELECT login,password,idUser FROM ${config.mysqlUtilisateur} WHERE login=? and password=?`
    const data = [login,password];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            if(rows.length !== 0){
                resolve(rows[0].idUser);
            }else {
                resolve(-1);
            }

        });
    });
}
module.exports.connectPost = connectPost;

function getIdsPetitsCours (maxId) {
    const query = `
        SELECT id FROM ${config.mysqlCourses}
        WHERE nbEtuds <= 45 AND id <= ?`;
    const data = [maxId];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getIdsPetitsCours = getIdsPetitsCours; // on exporte la fonction


function getNomsPetitsCours(idsPetitsCours) {
    let query = `
        SELECT nom FROM ${config.mysqlCourses} 
        WHERE id IN (${idsPetitsCours.map((objId) => '?').join(',')})`;
    const data = idsPetitsCours.map((objId) => objId.id);

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getNomsPetitsCours = getNomsPetitsCours;

function getCoursesQueries(idUser){
    const query = `
        SELECT * FROM ${config.mysqlCours} c INNER JOIN ${config.mysqlRelation} r 
        ON c.idMatiere=r.idMatiere WHERE r.idUser=?`;
    const data = [idUser];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getCoursesQueries = getCoursesQueries; // on exporte la fonction


function getTopicsQueries(idUser, idCours) {
    const query = `
        SELECT * FROM ${config.mysqlTopic} t WHERE t.idMatiere IN (SELECT r.idMatiere FROM ${config.mysqlRelation} r WHERE r.idUser = ? AND r.idMatiere = ?)`;
    const data = [idUser, idCours];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.getTopicsQueries = getTopicsQueries; // on exporte la fonction

function getPostsQuery(idTopic) {
    const query = `
        SELECT * FROM ${config.mysqlPost} WHERE idTopic=?`;
    const data = [idTopic];

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports.getPostsQuery = getPostsQuery;

function saveNewTopicQuery(newTitre, idCours, idUser) {
    const query = `
        INSERT INTO ${config.mysqlTopic} (idTopic, titre, nbPost, idMatiere) VALUES (NULL, ?, ?,?)
        `;
    const data = [newTitre,0,idCours];
    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            console.log("c là?")
            let a = resolve(rows.insertId);
            console.log("ihihi :" + a);
            const query = `
                UPDATE ${config.mysqlCours} SET nbTopic = (SELECT COUNT(*) from ${config.mysqlTopic} WHERE idMatiere= ? ) WHERE idMatiere = ?`;
            const data = [idCours, idCours];
            return new Promise((resolve, reject) => {
                db.query(query, data, (err, rows) => {
                    if (err) return reject(err);
                    resolve(a);
                });
            });
        })
    });
}

module.exports.saveNewTopicQuery = saveNewTopicQuery;
