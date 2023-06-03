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
    const listeProduits = cleanProductList(cleanMergeRecipe)


    const filterItem = listeProduits.filter(el => el.toLowerCase().includes(searchString))
    displayProductList(filterItem)
}

//Fonction de gestion des clique sur les filtres des appareils
function appareilFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    const listeAppareils = cleanApplianceList(cleanMergeRecipe)

    const filterItem = listeAppareils.filter(el => el.toLowerCase().includes(searchString))
    applianceListe.innerHTML = "";
    displayApplianceList(filterItem)
    // displayFilter()
}

//Fonction de gestion des clique sur les filtres des ustensils
function ustensilFilter(e) {

    const searchString = e.target.value.toLowerCase()
    const cleanMergeRecipe = recipeSort()
    const listeUstensils = cleanUstensilsList(cleanMergeRecipe)


    const filterItem = listeUstensils.filter(el => el.toLowerCase().includes(searchString))
    ustensilesListe.innerHTML = "";
    displayUstensilList(filterItem)
    // displayFilter()
}

//foncion de filtre des ingrédients
function cleanProductList(recipeList) {

    //trie des ingrédients pour le filtres en fonction des recettes affiché
    const allProductList = []
    const allProductListLower = []
    const cleanAllProductList = []
    recipeList.forEach(item => {
        item.ingredients.forEach(products => {
            allProductList.push(products.ingredient)
            allProductListLower.push(products.ingredient.toLowerCase())

        })
    })

    //Supprime les doublon dans le tableau des ingrédients case incensitive
    let cleanAllProductListLower = [...new Set(allProductListLower)]

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
    IngredientListe.innerHTML = "";
    cleanAllProductList.forEach(element => {
        IngredientListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light border-0 p-3 productItem">${element}</li>
            `
        )
    })

    return (IngredientListe)
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
    const allUstensilsListLower = []
    const cleanAllUstensilesList = []
    recipeList.forEach(item => {
        item.ustensils.forEach(ustensil => {
            allUstensilsList.push(ustensil)
            allUstensilsListLower.push(ustensil.toLowerCase())

        })
    })

    let cleanAllUstensilsListLower = [... new Set(allUstensilsListLower)]

    for (let i = 0; i < cleanAllUstensilsListLower.length; i++) {
        let check = 0
        for (let iLow = 0; iLow < allUstensilsList.length; iLow++) {
            if (cleanAllUstensilsListLower[i] === allUstensilsList[iLow].toLowerCase() && check == 0) {
                cleanAllUstensilesList.push(allUstensilsList[iLow])
                check = 1
            }
        }
    }


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

    //renvoi le tableau de filtre si des filtres ont été selectionné
    let allFilterActivated = document.querySelectorAll(".filterSelected > li")
    const filterArray = []
    //creation du tableau des filtre selectionné
    allFilterActivated.forEach(items => {
        filterArray.push(items)

    })
    const cleanMergeRecipe = filterRecipe(recipesArray, searchString, filterArray)

    return (cleanMergeRecipe)
}
