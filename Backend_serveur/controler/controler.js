//const Model = require('../models/modelUser');
//const User = require("../models/user")
const Utilisateur = require('../models/utilisateur');
const Modelsauce = require('../models/modelSauce')
const bcryp = require("bcrypt");
const web_token = require('jsonwebtoken');
const { json } = require('body-parser');
//const utilisateur = require('../models/utilisateur');


// exports.Enregistrement = (req, res, next)=>{
//     bcryp.hash(req.body.passWord,10)
//     .then((hash)=>{
//         const model = new Model({
//             email:req.body.email,
//             passWord:hash
//         });
//     model
//        .save()
//        .then(()=>res.status(200).json({message:"succé"}))
//        .catch((erreur)=>res.status(400).json({erreur}))
//     })
//     .catch((e)=>res.status.json({e}));
// }


// exports.Enregistrement = (req, res, next) => {
//     // console.log(req.body.nom);
//     // console.log(req.body.prenom);
//     console.log(req.body.email);
//     console.log(req.body.passWord);
//     // -- Hash du MDP avant l'envoi à la DB -- //
//     bcryp
//       .hash(req.body.passWord, 10)
//       .then((hash) => {
//         // -- Enregistrement du nouvel utilisateur dans la DB -- //
//         const user = new Model({
//           email: req.body.email,
//           passWord: hash,
//         });
        
  
//         // -- Envoi du contenu à la DB -- //
//         user
//           .save()
//           .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//           .catch((error) => res.status(400).json({ error }));
//           console.log(req.body);
//       })
      
//       .catch((error) => res.status(500).json({ error }));
//   };
  

//   exports.ajoute = (req, res, next) => {
//     console.log("oui ici");
//     console.log(req.body.prenom);
//     console.log(req.body.nom);
//     console.log(req.body.passWord);
//     console.log(req.body.email);
//     // -- Hash du MDP avant l'envoi à la DB -- //
//     bcryp
//       .hash(req.body.passWord, 10)
//       .then((hash) => {
//         // -- Enregistrement du nouvel utilisateur dans la DB -- //
//         const personne = new User({
//           nom: req.body.nom,
//           prenom: req.body.prenom,
//           email: req.body.email,
//           passWord: hash,
//         });
        
  
//         // -- Envoi du contenu à la DB -- //
//         personne.save()
//           .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//           .catch((error) => res.status(400).json({ error }));
//           console.log("c'est bnnnn");
//           // console.log(req.body);
//       })
      
//       .catch((error) => res.status(500).json({ error }));
//   };

//   // afficher les donnee 
//   exports.affichetAll = (req, res, next)=>{
//     Model.find()
//       .then((data)=>res.status(200).json(data))
//       .catch((e)=>{console.log(e);});

//   }
//   ///connexion
//   exports.Connexion = (req, res, next)=>{
//     console.log("teste de connexion");
//     console.log("tester mot de passe");
//     console.log(req.body.passWord);
//     User.findOne({email:req.body.email})
//        .then((model)=>{
//         console.log("il ya user");
//         console.log(model);
//           if (!model) {
//             return res.status(4001).json({message:"inconnu"})
//           }
//           bcryp.compare(req.body.passWord, model.passWord)
//             .then(valid =>{
//               if (!valid) {
//                 console.log("il ya pas user");
//               console.log(valid);
//               console.log(model);
//                 return res.status(400).json({message:"non authentifier"})
//               }
//              else{
//               console.log("c'est bnnnnn");
//               res.status(201).json({modelId : model._id,
//                 token:web_token.sign(
//                   { modelId:model._id },
//                   "RANDON-TOKEN-SECRET",
//                   {expiresIn:"24h"}

//                   )
//               });
//               console.log("tokennnnn");
//               console.log(res?.token);
//              }
//             }).catch(error=>res.status(403).json({error}));
//        }).catch(error=>res.status(500).json({error}));

//   }





  exports.EnregistrerUtilisateur = (req, res, next) => {
    // console.log(req.body.nom);
    // console.log(req.body.prenom);
    console.log(req.body.email);
    console.log(req.body.password);
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
          console.log(req.body);
      })
      
      .catch((error) => res.status(500).json({ error }));
  };

//connexion projet
    exports.Connexion = (req, res, next)=>{
    console.log("teste de connexion");
    console.log("tester mot de passe");
    console.log(req.body.password);
    Utilisateur.findOne({email:req.body.email})
       .then((model)=>{
        console.log("il ya user");
        console.log(model);
          if (!model) {
            return res.status(4001).json({message:"inconnu"})
          }
          bcryp.compare(req.body.password, model.password)
            .then(valid =>{
              if (!valid) {
                console.log("il ya pas user");
              console.log(valid);
              console.log(model);
                return res.status(400).json({message:"non authentifier"})
              }
             else{
              console.log("c'est bnnnnn");
              res.status(201).json({modelId : model._id,
                token:web_token.sign(
                  { modelId:model._id },
                  "RANDON-TOKEN-SECRET",
                  {expiresIn:"24h"}

                  )
              });
              console.log("tokennnnn");
              console.log(res?.token);
             }
            }).catch(error=>res.status(403).json({error}));
       }).catch(error=>res.status(500).json({error}));

  }



//ajouter sauces
  exports.ajouteSauce = (req, res, next) => {
    //recuperer toutes les donnee dans le formulaire
    const sauces = JSON.parse(req.body.sauce)
    delete sauces._id;
    delete sauces.userId;
    const donnee = new Modelsauce({
      ...sauces,
      userId:req.body.userId,
      imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    donnee.save()
    .then(() => res.status(201).json({ message: "objet sauces ajouter avec succe!" }))
    .catch((error) => res.status(400).json({ error }));
    // console.log("oui ici");
    // console.log(req.body.prenom);
    // console.log(req.body.nom);
    // console.log(req.body.passWord);
    // console.log(req.body.email);
    // // -- Hash du MDP avant l'envoi à la DB -- //
    // const modelsauce = new Modelsauce({
    //   nom: req.body.userId,
    //   prenom: req.body.name,
    //   email: req.body.manufacturer,
    //   nom: req.body.description,
    //   prenom: req.body.mainPepper,
    //   email: req.body.imageUrl,
    //   nom: req.body.heat,
    //   prenom: req.body.likes,
    //   email: req.body.dislikes ,
    //   nom: req.body.usersLiked,
    //   prenom: req.body.usersDisliked,
    // });
    

    // -- Envoi du contenu à la DB -- //
    // modelsauce.save()
    //   .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    //   .catch((error) => res.status(400).json({ error }));
    //   console.log("c'est bnnnn");
      // console.log(req.body);
  };

  //afficher 
  exports.affichetAll = (req, res, next)=>{
        Modelsauce.find()
          .then((data)=>res.status(200).json(data))
          .catch((e)=>{console.log(e);});
    
      }