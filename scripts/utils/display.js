
//Fonction d'affichage de toutes les recettes
function displayAll(recipes) {

    displayData(recipes);
    displayFilterDropdown(recipes);



    // if (recipes.length === 0) {
    //     //Message d'infomation qu'aucune recette n'a ete trouve

    //     recipeRow.appendChild(noRecipe);

    // } else {
    //     //creation de la recette avec la factory
    //     recipes.forEach(item => {
    //         let newRecipe = new Recipes(item);
    //         let article = newRecipe.createRecipe();
    //         recipeRow.appendChild(article);
    //         article.setAttribute("tabindex", "0");

    //         const addIngredient = document.querySelector(".ingredientsList_" + item.id);

    //         item.ingredients.forEach(products => {
    //             let product = products.ingredient;
    //             let quantité = products.quantity;
    //             let unite = products.unit;

    //             if (unite !== undefined) {
    //                 const produit = document.createElement("li");
    //                 produit.classList.add("ingreList");
    //                 produit.insertAdjacentHTML(
    //                     "beforeend",
    //                     `
    //                 <p class="product">${product}</p><p>${": "} ${quantité} ${unite}</p>
    //         `
    //                 );
    //                 addIngredient.appendChild(produit);

    //             } else if (quantité !== undefined) {

    //                 const produit = document.createElement("li");
    //                 produit.classList.add("ingreList");
    //                 produit.insertAdjacentHTML(
    //                     "beforeend",
    //                     `
    //             <p class="product">${product}</p> <p>${": "} ${quantité}</p>
    //         `
    //                 );
    //                 addIngredient.appendChild(produit);

    //             } else {
    //                 const produit = document.createElement("li");
    //                 produit.classList.add("ingreList");
    //                 produit.insertAdjacentHTML(
    //                     "beforeend",
    //                     `
    //             <p class="product"> ${product}</p >
    //                 `
    //                 );
    //                 addIngredient.appendChild(produit);

    //             }
    //         });

    //     });
    // }


}
function displayFilterDropdown(recipes) {
    console.log("on est là");
    creationFilter(recipes)
}

//Fonction d'affichage des recettes
function displayData(recipes) {

    const recipesSection = document.querySelector(".allRecipes");
    recipesSection.innerHTML = " ";
    recipesSection.classList.add("container", "d-flex", "flex-wrap");

    recipes.forEach(recipe => {

        let newRecipe = new FactoRecipes(recipe);

        const Card = newRecipe.createRecipe(recipe);
        recipesSection.appendChild(Card);
    });

}

//message si aucune recette n'est trouvée
function noRecipe() {

    const article = document.createElement('div');
    article.classList.add("col-xl-4", "card", "mb-5", "border-0", "p-0");
    article.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card-body bg-light rounded-bottom-3">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex flex-row recipeTime">
                        Aucune recette ne correspond à votre critère… vous pouvez
                        chercher « tarte aux pommes », « poisson », etc
                        </div>
                    </div>
                </div>
                    `
    );
    return (article);
}