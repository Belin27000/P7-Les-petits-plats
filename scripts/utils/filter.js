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

    const productList = cleanProductList(recipeList)
    displayProductList(productList)

    const applianceList = cleanApplianceList(recipeList)
    displayApplianceList(applianceList)

    const ustensilList = cleanUstensilsList(recipeList)
    displayUstensilList(ustensilList)

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
    return (cleanAllProductList)
}

/*Fonction d'affichage d'ajout des ingredients à la liste*/
function displayProductList(cleanAllProductList) {

    const IngredientListe = document.querySelector(".ingredientList")

    cleanAllProductList.forEach(element => {
        IngredientListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light border-0 p-3 productItem">${element}</li>
            `
        )
    })

}

//fonction de filtre des appareils
function cleanApplianceList(recipeList) {

    const allApplianceList = []
    recipeList.forEach(item => {
        allApplianceList.push(item.appliance)
    })

    const cleanAllApplianceList = [...new Set(allApplianceList)]

    return (cleanAllApplianceList)
}

/*Fonction d'ajout des appareils à la liste*/
function displayApplianceList(cleanAllApplianceList) {

    const applianceListe = document.querySelector(".appareilsList")

    cleanAllApplianceList.forEach(element => {
        applianceListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light border-0 p-3 applianceItem">${element}</li>
            `
        )
    })
}

//fonction de filtre des ustensiles
function cleanUstensilsList(recipeList) {

    const allUstensilsList = []
    recipeList.forEach(item => {
        item.ustensils.forEach(ustensil => {
            allUstensilsList.push(ustensil)

        })
        // console.log(allUstensilsList);
    })

    const cleanAllUstensilesList = [...new Set(allUstensilsList)]

    return (cleanAllUstensilesList)
}

//fonction d'ajout des ustensils à la liste
function displayUstensilList(cleanAllUstensilesList) {

    const ustensilesListe = document.querySelector(".ustensilesList")
    // IngredientListe.innerHTML = " ";

    cleanAllUstensilesList.forEach(element => {
        ustensilesListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light p-3 ustensileItem">${element}</li>
            `
        )
    })
}

//fonction de recuperation des recettes triées
function recipeSort() {
    const searchString = document.querySelector(".searchbar").value
    const recipesArray = Array.from(recipes) //copie de la liste des recettes
    const cleanMergeRecipe = filterRecipe(recipesArray, searchString)

    return (cleanMergeRecipe)
}
//Fonction de gestion des clique sur les filtres d'ingrédients
function ingredientFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    const listeProduits = cleanProductList(cleanMergeRecipe)
    console.log(listeProduits);
    console.log(e.target.value);

    const filterItem = listeProduits.filter(el => el.toLowerCase().includes(searchString))
    console.log(filterItem);


}

//Fonction de gestion des clique sur les filtres des appareils
function appareilFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    const listeAppareils = cleanApplianceList(cleanMergeRecipe)
    console.log(listeAppareils);
    console.log(e.target.value);

    const filterItem = listeAppareils.filter(el => el.toLowerCase().includes(searchString))
    console.log(filterItem);

}

//Fonction de gestion des clique sur les filtres des ustensils
function ustensilFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    const listeUstensils = cleanUstensilsList(cleanMergeRecipe)
    console.log(listeUstensils);
    console.log(e.target.value);

    const filterItem = listeUstensils.filter(el => el.toLowerCase().includes(searchString))
    console.log(filterItem);

}
