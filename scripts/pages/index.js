const searchInput = document.querySelector(".form-control")
let recipesArray;
//J'initialise mon marionetiste
async function init() {
    let recipesArray = Array.from(recipes)
    // console.log(recipes);
    // const { ingredients, equipment, tools, recette } = recipes
    // const ingredient = recipes
    displayRecipes(recipesArray)
}

//Fonction d'affichage de toutes les recettes
function displayRecipes(recipesArray) {


    const recipeCont = document.querySelector(".allRecipes")
    recipeCont.classList.add("container");
    const recipeRow = document.createElement("div")
    recipeRow.classList.add("row")
    recipeCont.appendChild(recipeRow)

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

};

searchInput.addEventListener("input", filterData)

// //Fonction de recherche de recette
function filterData(e) {

    const recipeRow = document.querySelector(".allRecipes")
    const searchString = e.target.value.toLowerCase();
    let recipesArray = Array.from(recipes)
    console.log(recipesArray);

    let i = 0
    if (searchString.length >= 3) {
        recipeRow.innerHTML = ""

        const productArray = []
        recipesArray.forEach(item => {
            item.ingredients.forEach(products => {
                let product = products.ingredient
                if (product.toLowerCase().includes(searchString)) {
                    productArray.push(item)
                    // console.log(productArray);
                }
            })



        })
        const filteredArr = recipesArray.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))
        const mergeRecipe = [].concat(productArray, filteredArr);
        const cleanMergeRecipe = [...new Set(mergeRecipe)]
        console.log(cleanMergeRecipe);
        displayRecipes(cleanMergeRecipe)
        // console.log(filteredArr);
    } else if (i === 0) {
        recipeRow.innerHTML = ""
        displayRecipes(recipesArray)

        i = 1
        console.log(i);
    }

}


init();