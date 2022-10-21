fillSection();

// Récupération des articles de l'API
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

    // Répartition des données de l'API dans le DOM
async function fillSection() {
   const articles = await getArticles()
   console.log(articles)
   articles.forEach(article=> { 
                // Insertion de l'élément "a"
            const productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${article._id}`;

            // Insertion de l'élément "article"
            const productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            const productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt;

            // Insertion du titre "h3"
            const productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = article.name;

            // Insertion de la description "p"
            const productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = article.description;
   })


}