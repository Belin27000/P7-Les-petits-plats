/**
 * Fonction de création des différents filtres
 * sous la barre de recherche
 */
//initialisation des tableaux de récupération des données des filtres
const allProductList = []
const allAppareils = []
const allUstensiles = []

function initFilter() {
    const IngredientListe = document.querySelector(".ingredientList")
    const applianceListe = document.querySelector(".appareilsList")
    const ustensilesListe = document.querySelector(".ustensilesList")


    IngredientListe.innerHTML = "";
    applianceListe.innerHTML = "";
    ustensilesListe.innerHTML = "";

}

function filterSort(recipeList) {

    cleanProductList(recipeList)
    cleanApplianceList(recipeList)
    cleanUstensilsList(recipeList)
}

//foncion de filtre des ingrédients
function cleanProductList(recipeList) {

    //trie des ingrédients pour le filtres en fonction des recettes affiché
    const allProductList = []
    recipeList.forEach(item => {
        item.ingredients.forEach(products => {
            allProductList.push(products.ingredient)
        })
    })
    const cleanAllProductList = [...new Set(allProductList)]

    const IngredientListe = document.querySelector(".ingredientList")

    cleanAllProductList.forEach(element => {
        IngredientListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="bg-primary rounded border-0 p-3 productItem">${element}</li>
            `
        )
    })
}

//foncion de filtre des appareils
function cleanApplianceList(recipeList) {

    const allApplianceList = []
    recipeList.forEach(item => {
        allApplianceList.push(item.appliance)
    })

    const cleanallApplianceList = [...new Set(allApplianceList)]

    const applianceListe = document.querySelector(".appareilsList")

    cleanallApplianceList.forEach(element => {
        applianceListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="rounded border-0 p-3 productItem">${element}</li>
            `
        )
    })
}

//foncion de filtre des ustensiles
function cleanUstensilsList(recipeList) {

    const allUstensilsList = []
    recipeList.forEach(item => {
        item.ustensils.forEach(ustensil => {
            allUstensilsList.push(ustensil)

        })
        // console.log(allUstensilsList);
    })

    const cleanAllUstensilesList = [...new Set(allUstensilsList)]

    const ustensilesListe = document.querySelector(".ustensilesList")
    // IngredientListe.innerHTML = " ";

    cleanAllUstensilesList.forEach(element => {
        ustensilesListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="rounded border-0 p-3 productItem">${element}</li>
            `
        )
    })
}

