
const Utilisateur = require('../models/utilisateur');
const Modelsauce = require('../models/modelSauce')
const bcryp = require("bcrypt");
const web_token = require('jsonwebtoken');
const { json } = require('body-parser');
const fichierImageModifier = require('fs');
const modelSauce = require('../models/modelSauce');
//const utilisateur = require('../models/utilisateur');

//ajouter user
exports.EnregistrerUtilisateur = (req, res, next) => {
  // -- Hash du MDP avant l'envoi à la DB -- //
  bcryp
    .hash(req.body.password, 10)
    .then((hash) => {
      // -- Enregistrement du nouvel utilisateur dans la DB -- //
      const utilisateur = new Utilisateur({
        email: req.body.email,
        password: hash,
      });


      // -- Envoi du contenu à la DB -- //
      utilisateur
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};

//connexion projet
exports.Connexion = (req, res, next) => {
  Utilisateur.findOne({ email: req.body.email })
    .then((model) => {
      console.log("il ya user");
      console.log(model);
      if (!model) {
        return res.status(401).json({ message: "inconnu" })
      }
      //compare le mot de passe
      bcryp.compare(req.body.password, model.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ message: "non authentifier" })
          }
          else {
            //generer un token pour la securité
            console.log("c'est bnnnnn");
            res.status(201).json({
              userId: model._id,
              token: web_token.sign(
                { userId: model._id },
                "RANDOM_TOKEN_SECRET",
                { expiresIn: "24h" }
              )
            });
          }
        }).catch(error => res.status(403).json({ error }));
    }).catch(error => res.status(500).json({ error }));

}

//ajouter sauces
exports.ajouteSauce = (req, res, next) => {
  //recuperer toutes les donnee dans le formulaire
  const sauces = JSON.parse(req.body.sauce)
  const donnee = new Modelsauce({
    ...sauces,

    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  donnee.save()
    .then(() => res.status(201).json({ message: "objet sauces ajouter avec succe!" }))
    .catch((error) => res.status(400).json({ error }));
};

//afficher 
exports.affichetAll = (req, res, next) => {
  Modelsauce.find()
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));

}
exports.Recherche = (req, res, next) => {
  const id = req.params.id
  Modelsauce.findOne({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch(error => res.status(400).json({ error }));
}

//modification
exports.update = (req, res, next) => {
  //const id = req.params.id
  modelSauce.findOne({ _id: req.params.id })
    .then((data) => {
      //pour le niveau de securite pour tester si c'est vraiment user qui est connecté
      if (data.userId === req.auth.userId) {
        if (req.file) {
          const elt = data.imageUrl.split('/images/')[1];
          //supprimer le image qui existe dans le dossier image
          fichierImageModifier.unlink(`images/${elt}`, (error) => {
            if (error) {
              console.log(error);
            }
          });
        }
        // si on a modifie les elements avec image
        const ObjetNouveaufichier = req.file ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,

        } : { ...req.body };
        // Modelsauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) ça modifier juste les elements sans modifie image
        Modelsauce.updateOne({ _id: req.params.id }, { ...ObjetNouveaufichier, _id: req.params.id })
          .then((data) => res.status(200).json(data))
          .catch(error => res.status(400).json({ error }));
      }
    })


}
//supprimer
exports.delete = (req, res, next) => {
  modelSauce.findOne({ _id: req.params.id })
  .then((data) => {
    //pour le niveau de securite pour tester si c'est vraiment user qui est connecté
    if (data.userId === req.auth.userId) {
      const elt = data.imageUrl.split('/images/')[1];
      
      //supprimer l'image qui existe dans le dossier images
      fichierImageModifier.unlink(`images/${elt}`, (error) => {
        if (error) {
          console.log(error);
        }
      })
      const id = req.params.id
      Modelsauce.deleteOne({ _id: id })
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));

    }
  })
}
//licke
exports.likes = (req, res, next) =>{
  // il veut enlever le like ou enlever le dislike
  if (req.body.like == 0) {
    modelSauce.findOne({ _id: req.params.id })
     .then((lik)=>{
      //tester si id de user exite dans bd
      if (lik.usersLiked.includes(req.body.userId)) {
        modelSauce.updateOne(
          {_id:req.params.id},
          {
            // faire mise a jour de element dans bd
            $pull:{usersLiked:req.body.userId},
            $inc:{likes:-1}
          }
        )
        .then(() => res.status(201).json({ message: "objet n'est pas aimé" }))
        .catch((error) => res.status(400).json({ error }));
      }
      if (lik.usersDisliked.includes(req.body.userId)) {
        modelSauce.updateOne(
          {_id:req.params.id},
          {
            $pull:{usersDisliked:req.body.userId},
            $inc:{dislikes:-1}
          }
        )
        .then(() => res.status(201).json({ message: "objet n'est pas aimé" }))
        .catch((error) => res.status(400).json({ error }));
        
      }
     })
  }
  // user veux liker
  if (req.body.like == 1) {
  modelSauce.updateOne(
    {_id:req.params.id},
    {
      // ajouter id de user qui a liké. ça fait d'une maniere automatique avec ($push et $inc element reconnu par js)
      $push:{usersLiked:req.body.userId},
      $inc:{likes:+1}
    }

  ).then(() => res.status(201).json({ message: "objet liké" }))
   .catch((error) => res.status(400).json({ error }));
    
  }
//le contraire
//n'est pas aimé
  if (req.body.like == -1) {
    modelSauce.updateOne(
      {_id:req.params.id},
      {
        $push:{usersDisliked:req.body.userId},
        $inc:{dislikes:+1}
      }
  
    ).then(() => res.status(201).json({ message: "objet n'est pas liké" }))
     .catch((error) => res.status(400).json({ error }));
      
    }

}