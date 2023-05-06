const searchInput = document.querySelector(".form-control")
let recipesArray;
//J'initialise mon marionetiste
async function init() {
    let recipesArray = Array.from(recipes)
    // console.log(recipes);
    // const { ingredients, equipment, tools, recette } = recipes
    // const ingredient = recipes
    displayRecipes(recipesArray)

    searchInput.addEventListener("input", filterData) //Recherche les recettes du champs recherche dans searchRecipe.js

}

//Fonction d'affichage de toutes les recettes
function displayRecipes(recipesArray, noRecipe) {

    const recipeCont = document.querySelector(".allRecipes")
    recipeCont.classList.add("container");
    const recipeRow = document.createElement("div")
    recipeRow.classList.add("row")
    recipeCont.appendChild(recipeRow)


    if (recipesArray.length === 0) {
        console.log(noRecipe);

        recipeRow.appendChild(noRecipe)

    } else {


        recipesArray.forEach(item => {
            // console.log(item);
            let newRecipe = new Recipes(item)
            let article = newRecipe.createRecipe()
            recipeRow.appendChild(article);
            article.setAttribute("tabindex", "0")
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
            });

        });
    }

};


// //Fonction de recherche de recette



init();