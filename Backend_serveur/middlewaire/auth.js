const web_token = require('jsonwebtoken');
module.exports = (req, res, next)=>{
    try{
        //header , authorisation dans l'entete
        const token = req.headers.authorization.split('')[1];
        const decodeToken = web_token.verify(token, 'RANDOM_TOKEN_SECRET');
        //requipperer id dans token
        const modelId = decodeToken.modelId;
        //envoyer l'ide 
        req.auth={
            modelId: modelId
        };
    }
    catch(erreur){
        res.status(401).json({erreur});
    }
}