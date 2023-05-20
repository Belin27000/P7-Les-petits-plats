/**
 * Fonction de création des différents filtres
 * sous la barre de recherche
 */
//initialisation des tableaux de récupération des données des filtres
const allProductList = []
const allAppareils = []
const allUstensiles = []

//Selection des liste des différents filtre
const IngredientListe = document.querySelector(".ingredientList")
const applianceListe = document.querySelector(".appareilsList")
const ustensilesListe = document.querySelector(".ustensilesList")

function initFilter() {

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
//Fonction de gestion des clique sur les filtres d'ingrédients
function ingredientFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    console.log(cleanMergeRecipe);
    const listeProduits = cleanProductList(cleanMergeRecipe)
    console.log(listeProduits);
    console.log(e.target.value);

    const filterItem = listeProduits.filter(el => el.toLowerCase().includes(searchString))
    IngredientListe.innerHTML = "";
    displayProductList(filterItem)
    console.log(cleanFilterItem);

}

//Fonction de gestion des clique sur les filtres des appareils
function appareilFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    const listeAppareils = cleanApplianceList(cleanMergeRecipe)
    console.log(listeAppareils);
    console.log(e.target.value);

    const filterItem = listeAppareils.filter(el => el.toLowerCase().includes(searchString))
    applianceListe.innerHTML = "";
    displayApplianceList(filterItem)
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
    ustensilesListe.innerHTML = "";
    displayUstensilList(filterItem)
    console.log(filterItem);

}

//foncion de filtre des ingrédients
function cleanProductList(recipeList) {


    //trie des ingrédients pour le filtres en fonction des recettes affiché
    const allProductList = []
    const allProductListLower = []
    const cleanAllProductList = []
    recipeList.forEach(item => {
        item.ingredients.forEach(products => {
            // console.log(products);
            allProductList.push(products.ingredient)
            allProductListLower.push(products.ingredient.toLowerCase())

            // console.log(allProductList);
        })
    })

    //Supprime els doublon dans le tableau des ingrédients case incensitive
    let cleanAllProductListLower = [...new Set(allProductListLower)]
    console.log(cleanAllProductListLower);

    for (let i = 0; i < cleanAllProductListLower.length; i++) {
        let check = 0
        for (let iLow = 0; iLow < allProductList.length; iLow++) {
            if (cleanAllProductListLower[i] === allProductList[iLow].toLowerCase() && check == 0) {
                cleanAllProductList.push(allProductList[iLow])
                check = 1
            }

        }

    }
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

