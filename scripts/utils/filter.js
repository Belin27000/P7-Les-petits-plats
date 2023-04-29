/**
 * Fonction de création des différents filtres
 * sous la barre de recherche
 */
//initialisation des tableaux de récupération des données des filtres
const allProductList = []
const allAppareils = []
const allUstensiles = []
function filterSort(recipeList) {
    // console.log(recipeList);
    // const test = recipeList[0].description
    // console.log(test);



    const ingredientFilter = document.querySelector(".filter-ingredients")
    const ingredientFilterList = document.createElement("div")
    ingredientFilterList.classList.add("test")
    ingredientFilter.appendChild(ingredientFilterList)

    //Ajoute tous les ingrédients dans un tableau
    recipeList.forEach(item => {
        //recupère tous les ingrédients des recettes
        item.ingredients.forEach(products => {
            let product = products.ingredient
            allProductList.push(product)
        })

        //recupère tous les ustensiles des recettes
        item.ustensils.forEach(ustensiles => {

            allUstensiles.push(ustensiles)
            // console.log(allUstensiles);
        })

        //recupère tous les appareils des recettes
        let appareil = item.appliance
        allAppareils.push(appareil)

    })
    const cleanAllProductList = [...new Set(allProductList)]//suppression des doublons liste ingrédient
    const cleanAllAppareils = [...new Set(allAppareils)]//suppression des doublons appareils
    const cleanAllUstensiles = [...new Set(allUstensiles)]//suppression des doublons ustensiles

    console.log(cleanAllProductList);
    console.log(cleanAllAppareils);
    console.log(cleanAllUstensiles);
    // console.log(cleanAllProductList);
}