//J'initialise mon marionetiste
async function init() {
    // console.log(recipes[1]);
    const { ingredients, equipment, tools, recette } = recipes
    const ingredient = recipes
    displayRecipes()
}

//Fonction pour organiser
function displayRecipes() {
    // console.log('Je suis passé par là');
    // console.log(recipes);
    const recipesSection = document.querySelector(".allRecipes");

    recipesSection.classList.add("container");


    const recipeCont = document.querySelector(".allRecipes")
    const recipeRow = document.createElement("div")
    recipeRow.classList.add("row")
    recipeCont.appendChild(recipeRow)

    recipes.forEach(item => {
        // console.log(item);
        let newRecipe = new Recipes(item)
        let article = newRecipe.createRecipe()
        recipeRow.appendChild(article);
        article.setAttribute("tabindex", "0")
        console.log(item.id);
        // console.log(article.childNodes);

        const addIngredient = document.querySelector(".ingredientsList_" + item.id)

        item.ingredients.forEach(products => {
            let product = products.ingredient
            let quantité = products.quantity
            let unite = products.unit

            if (unite !== undefined) {
                const produit = document.createElement("li")
                produit.classList.add("ingreList")
                produit.insertAdjacentHTML(
                    "beforeend",
                    `
                    <p class="product">${product}</p><p>${`: `} ${quantité} ${unite}</p>
            `
                )
                addIngredient.appendChild(produit)

            } else if (quantité !== undefined) {

                const produit = document.createElement("li")
                produit.classList.add("ingreList")
                produit.insertAdjacentHTML(
                    "beforeend",
                    `
                <p class="product">${product}</p> <p>${`: `} ${quantité}</p>
            `
                )
                addIngredient.appendChild(produit)

            } else {
                const produit = document.createElement("li")
                produit.classList.add("ingreList")
                produit.insertAdjacentHTML(
                    "beforeend",
                    `
                <p class="product"> ${product}</p >
                    `
                )
                addIngredient.appendChild(produit)

            }
            // console.log(product);
            // console.log(quantité);
            // console.log(unite);


        });


    });

};


init();