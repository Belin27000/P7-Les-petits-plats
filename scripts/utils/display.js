
//Fonction d'affichage de toutes les recettes
function displayAll(recipes, noRecipe) {


    console.log(recipes);
    //creation et ajout du container pour recevoir les recettes
    const recipeCont = document.querySelector(".allRecipes");
    recipeCont.classList.add("container");
    // const recipeRow = document.querySelector(".allRecipes")
    const recipeRow = document.createElement("div");
    recipeRow.classList.add("row");
    recipeCont.appendChild(recipeRow);


    if (recipesArray.length === 0) {
        //Message d'infomation qu'aucune recette n'a ete trouve

        recipeRow.appendChild(noRecipe);

    } else {
        //creation de la recette avec la factory
        recipesArray.forEach(item => {
            let newRecipe = new Recipes(item);
            let article = newRecipe.createRecipe();
            recipeRow.appendChild(article);
            article.setAttribute("tabindex", "0");

            const addIngredient = document.querySelector(".ingredientsList_" + item.id);

            item.ingredients.forEach(products => {
                let product = products.ingredient;
                let quantité = products.quantity;
                let unite = products.unit;

                if (unite !== undefined) {
                    const produit = document.createElement("li");
                    produit.classList.add("ingreList");
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                    <p class="product">${product}</p><p>${": "} ${quantité} ${unite}</p>
            `
                    );
                    addIngredient.appendChild(produit);

                } else if (quantité !== undefined) {

                    const produit = document.createElement("li");
                    produit.classList.add("ingreList");
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                <p class="product">${product}</p> <p>${": "} ${quantité}</p>
            `
                    );
                    addIngredient.appendChild(produit);

                } else {
                    const produit = document.createElement("li");
                    produit.classList.add("ingreList");
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                <p class="product"> ${product}</p >
                    `
                    );
                    addIngredient.appendChild(produit);

                }
            });

        });
    }


}

function display() {

}