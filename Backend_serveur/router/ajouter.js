const express = require('express');
const Control = require('../controler/controler');
const auth = require("../middlewaire/auth")
const multer = require('../middlewaire/gestion_fichier')



const router = express.Router();
router.get('/', auth, Control.affichetAll);
router.post('/', auth,multer, Control.ajouteSauce);


module.exports = router;
