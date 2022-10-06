// pour différancier la page confirmation et panier
const page = document.location.href;


// Récupération des produits de l'api

// appel de la ressource api product (voir script.js) si on est sur la page panier
if (page.match("cart")) {
fetch("http://localhost:5500/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
      console.log(objetProduits);
      // appel de la fonction affichagePanier
      affichagePanier(objetProduits);
  })
  .catch((err) => {
      document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + err);
  });
} else {
  console.log("sur page confirmation");
}