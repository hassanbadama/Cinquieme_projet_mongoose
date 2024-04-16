const express = require('express');
const Control = require('../controler/controler');
// const auth = require("../middlewaire/auth")
// const multer = require('../middlewaire/gestion_fichier')




//const router = express.Router();
// router.post('/tps', Control.Enregistrement);
// router.post('/pss', Control.ajoute);
// //- exemple de utilisation de midllwaire pour la connexion--  router.get('/affiche', auth, Control.affichetAll);
// //- exemple de utilisation de midllwaire pour la gestion des images --  router.get('/affiche', multer, Control.affichetAll);
// router.get('/affiche', Control.affichetAll);
// router.post('/connexion', Control.Connexion);
const router = express.Router();
router.post('/signup', Control.EnregistrerUtilisateur);
router.post('/login', Control.Connexion);


module.exports = router;
