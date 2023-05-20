const searchInput = document.querySelector(".form-control")
const filterArrow = document.querySelectorAll(".filterArrow button")
const filterCont = document.querySelectorAll(".filterArrow")
let recipesArray;
const ingredientInput = document.querySelector(".inputingredient")
const applianceInput = document.querySelector(".inputAppareils")
const ustensilInput = document.querySelector(".inputUstensiles")
//J'initialise mon marionetiste
async function init() {
    let recipesArray = Array.from(recipes)

    //Affiche toutes les recettes et les filtres directement au lancement de la page
    displayRecipes(recipesArray);
    filterSort(recipesArray);


    searchInput.addEventListener("input", filterData) //Recherche les recettes du champs recherche dans searchRecipe.js
    ingredientInput.addEventListener("input", ingredientFilter) //Filtre les ingrédients du champs recherche dans filterInput.js
    applianceInput.addEventListener("input", appareilFilter) //Filtre les appareils du champs recherche dans filterInput.js
    ustensilInput.addEventListener("input", ustensilFilter) //Filtre les appareils du champs recherche dans filterInput.js

    displayFilter();

}

//Fonction d'affichage de toutes les recettes
function displayRecipes(recipesArray, noRecipe) {
    //creation et ajout du container pour recevoir les recettes
    const recipeCont = document.querySelector(".allRecipes")
    recipeCont.classList.add("container");
    const recipeRow = document.createElement("div")
    recipeRow.classList.add("row")
    recipeCont.appendChild(recipeRow)


    if (recipesArray.length === 0) {
        console.log(noRecipe);

        recipeRow.appendChild(noRecipe)

    } else {
        //creation de la recette avec la factory
        recipesArray.forEach(item => {
            // console.log(item);
            let newRecipe = new Recipes(item)
            let article = newRecipe.createRecipe()
            recipeRow.appendChild(article);
            article.setAttribute("tabindex", "0")

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

/*Fonction d'affichage des differents filtre au clique*/
function displayFilter() {

    for (let i = 0; i < filterArrow.length; i++) {

        const selectedFilter = filterCont[i].querySelector("ul")

        if (!selectedFilter.classList.contains("d-none")) {
            selectedFilter.classList.remove("d-none")
        }
        filterArrow[i].addEventListener("click", () => {

            selectedFilter.classList.toggle("d-none")
            selectedFilter.classList.toggle("list")
            filterArrow[i].classList.toggle("select")

            // selectedFilter.classList.toggle("active")

            console.log(selectedFilter)


        })

    }
}




init();