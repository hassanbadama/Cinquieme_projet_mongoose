const express = require('express');
const Control = require('../controler/controler');
const auth = require("../middlewaire/auth")
const multer = require('../middlewaire/gestion_fichier')



const router = express.Router();
router.get('/', auth, Control.affichetAll);
router.post('/',multer, Control.ajouteSauce);
router.get('/:id', auth, Control.Recherche);
router.put('/:id', auth,multer, Control.update);
router.delete('/:id', auth, Control.delete);
router.post('/:id/like', auth, Control.likes);


module.exports = router;
