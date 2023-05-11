const searchInput = document.querySelector(".form-control")
const filterArrow = document.querySelectorAll(".filterArrow button")
const filterCont = document.querySelectorAll(".filterArrow")
let recipesArray;
//J'initialise mon marionetiste
async function init() {
    let recipesArray = Array.from(recipes)


    displayRecipes(recipesArray);

    searchInput.addEventListener("input", filterData) //Recherche les recettes du champs recherche dans searchRecipe.js
    // filterArrow.addEventListener("click", displayFilter)
    displayFilter();

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

function displayFilter() {


    for (let i = 0; i < filterArrow.length; i++) {

        const selectedFilter = filterCont[i].querySelector("ul")

        if (!selectedFilter.classList.contains("d-none")) {
            selectedFilter.classList.remove("d-none")
        }
        filterArrow[i].addEventListener("click", () => {
            selectedFilter.classList.toggle("d-none")
            selectedFilter.classList.toggle("list")

            // selectedFilter.classList.toggle("active")

            console.log(selectedFilter)


        })

    }
}




init();