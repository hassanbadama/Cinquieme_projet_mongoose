
let connexion = document.querySelector("#form")
connexion.addEventListener('submit', function (e) {
  e.preventDefault()
  let mot_passe = document.querySelector("#passe").value
  let email = document.querySelector("#nom").value
  let nom = document.querySelector("#nom1").value
  let prenom = document.querySelector("#prenom").value
  console.log("mot de passe= "+mot_passe + " mail = " + email);
  const data = {
    nom:nom,
    prenom:prenom,
    email:email,
    passWord:mot_passe
  }
 fetch("http://localhost:3000/hassane/tp/pss", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then((res) => {
      if(res.ok){
        return res.json() 
      }
     else if (res.status === 404) {
      console.log("utilisateur inconnu");
        document.querySelector("#erreur").innerHTML = "utilisateur inconnu"
        document.querySelector("#erreur").style.color = "red"
     }
     else if(res.status === 401) {
      console.log("utilisateur non autoriser");
      document.querySelector("#erreur").innerHTML = "utilisateur non autoriser"
        document.querySelector("#erreur").style.color = "red"
     }
    })
    .then(res => {
      console.log('bommmmmm')
    })

})
console.log("les elements teste");
fetch("http://localhost:3000/hassane/tp/affiche")
.then((res)=>res.json())
.then((data)=>{
  console.log(data);
  data.forEach(elt => {
    console.log(elt.passWord);
    console.log(elt.email);
    produit = `
    <div id="supParent">
       <div> ${elt.email}</div>
       <div> ${elt.passWord}</div>
          
      </div>`
     const ajout = document.querySelector("#teste")
     ajout.insertAdjacentHTML("beforeend", produit)
    
  });
})
