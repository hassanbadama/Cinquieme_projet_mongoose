const web_token = require('jsonwebtoken');


module.exports = (req, res, next)=>{
    try{
        //header , authorisation dans l'entete
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = web_token.verify(token, 'RANDOM_TOKEN_SECRET');
        
        //requipperer id dans token
        const modelId = decodeToken.userId;
        console.log("oui teste de token");
        console.log(modelId);
        //envoyer l'id
        req.auth={
            userId: modelId
        };
        next();
    }
    catch(erreur){
        res.status(401).json({erreur});
    }
}

// module.exports = (req, res, next)=>{
//     try{
//         //header , authorisation dans l'entete
//         //  "Authorization":`Bearer ${token}` split(' ') recuperer tout ce qui trouve apré espace  pour entre beare et token
//         const token = req.headers.authorization.split(' ')[1];
//         // verifier le mot cle 'RANDON-TOKEN-SECRET' qui est sait dans controleur lors de la connexion
//         const decodeToken = web_token.verify(token, 'RANDON-TOKEN-SECRET');
//         //requipperer id dans token
//         const modelId = decodeToken.userId;
//         //envoyer l'id  pour garantir la securité
//         req.auth={
//             userId: modelId
//         };
//     }
//     catch(erreur){
//         res.status(401).json({erreur});
//     }
// }