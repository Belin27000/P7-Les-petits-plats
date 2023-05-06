/**
 * Fonction de création des différents filtres
 * sous la barre de recherche
 */
//initialisation des tableaux de récupération des données des filtres
const allProductList = []
const allAppareils = []
const allUstensiles = []

function filterSort(recipeList) {

    cleanProductList(recipeList)
}

//foncion de filtre des ingrédients
function cleanProductList(recipeList) {

    const allProductList = []
    recipeList.forEach(item => {
        item.ingredients.forEach(products => {
            allProductList.push(products.ingredient)
        })
    })
    console.log(allProductList);
    const cleanAllProductList = [...new Set(allProductList)]
    console.log(cleanAllProductList.length);

    const IngredientListe = document.querySelector(".ingredientList")
    // IngredientListe.innerHTML = " ";

    cleanAllProductList.forEach(element => {
        IngredientListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="bg-primary rounded border-0 p-3 productItem">${element}</li>
            `
        )
    })
    console.log(cleanAllProductList.length);
    // console.log(IngredientListe)

}