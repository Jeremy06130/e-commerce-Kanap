let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

if (!productLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i = 0; i < productLocalStorage.length; i++) {

        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

        // Insertion de l'élément "div" pour l'image produit
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productLocalStorage[i].imgKanap;
        // productImg.alt = productLocalStorage.altImgProduit;

        // Insertion de l'élément "div" pour la description produit
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";

        // Insertion du titre h2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = productLocalStorage[i].nameKanap;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productLocalStorage[i].colorKanap;
        productColor.style.fontSize = "20px";

        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

        // Insertion de "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = productLocalStorage[i].qtyKanap;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener("click", (e) => {
            e.preventDefault;

            // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
            let deleteId = productLocalStorage[i].idKanap;
            let deleteColor = productLocalStorage[i].colorKanap;

            // filtrer l'élément cliqué par le bouton supprimer
            productLocalStorage = productLocalStorage.filter(elt => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor);

            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem('cart', JSON.stringify(productLocalStorage));

            // avertir de la suppression et recharger la page
            alert('Votre article a bien été supprimé.');

            //Si pas de produits dans le local storage on affiche que le panier est vide
            if (productLocalStorage.length === 0) {
                localStorage.clear();
            }
            //Refraichir la page 
            location.reload();
        });
    }
}
function getTotals() {

    // Récupération du total des quantités
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length,
        totalQtt = 0;

    for (let i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total
    totalPrice = 0;
    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}
getTotals();


function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[k].qtyKanap;
            let qttModifValue = qttModif[k].valueAsNumber;

            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.qtyKanap = qttModifValue;
            productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

            localStorage.setItem("cart", JSON.stringify(productLocalStorage));

            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();
