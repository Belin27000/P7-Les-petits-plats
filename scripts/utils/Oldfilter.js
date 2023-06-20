/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * Fonction de création des différents filtres
 * sous la barre de recherche
 */
//initialisation des tableaux de récupération des données des filtres
const allProductList = [];
const allAppareils = [];
const allUstensiles = [];

//Selection des liste des différents filtre
const IngredientListe = document.querySelector(".ingredientList");
const applianceListe = document.querySelector(".appareilsList");
const ustensilesListe = document.querySelector(".ustensilesList");






function initFilter() {

    IngredientListe.innerHTML = "";
    applianceListe.innerHTML = "";
    ustensilesListe.innerHTML = "";

}

function filterSort(recipeList, filterArray) {
    const productList = cleanProductList(recipeList, filterArray);
    displayProductList(productList);

    const applianceList = cleanApplianceList(recipeList, filterArray);
    displayApplianceList(applianceList);

    const ustensilList = cleanUstensilsList(recipeList, filterArray);
    displayUstensilList(ustensilList);

}
//Fonction de gestion des clique sur les filtres d'ingrédients
function ingredientFilter(e) {
    const searchString = e.target.value.toLowerCase();
    const cleanMergeRecipe = recipeSort();
    const listeProduits = cleanProductList(cleanMergeRecipe);


    const filterItem = listeProduits.filter(el => el.toLowerCase().includes(searchString));
    displayProductList(filterItem);
    selectFilter();

}

//Fonction de gestion des clique sur les filtres des appareils
function appareilFilter(e) {

    const searchString = e.target.value.toLowerCase();
    const cleanMergeRecipe = recipeSort();
    const listeAppareils = cleanApplianceList(cleanMergeRecipe);

    const filterItem = listeAppareils.filter(el => el.toLowerCase().includes(searchString));
    displayApplianceList(filterItem);
    selectFilter();
}

//Fonction de gestion des clique sur les filtres des ustensils
function ustensilFilter(e) {

    const searchString = e.target.value.toLowerCase();
    const cleanMergeRecipe = recipeSort();
    const listeUstensils = cleanUstensilsList(cleanMergeRecipe);


    const filterItem = listeUstensils.filter(el => el.toLowerCase().includes(searchString));
    displayUstensilList(filterItem);
    selectFilter();

}

//foncion de filtre des ingrédients
function cleanProductList(recipeList, filterArray) {


    //trie des ingrédients pour le filtres en fonction des recettes affiché
    const allProductList = [];
    const allProductListLower = [];
    const cleanAllProductList = [];
    const cleanAllProductListSort = [];
    recipeList.forEach(item => {
        item.ingredients.forEach(products => {
            allProductList.push(products.ingredient);
            allProductListLower.push(products.ingredient.toLowerCase());

        });
    });

    //Supprime les doublon dans le tableau des ingrédients case incensitive
    let cleanAllProductListLower = [...new Set(allProductListLower)];

    for (let i = 0; i < cleanAllProductListLower.length; i++) {
        let check = 0;
        for (let iLow = 0; iLow < allProductList.length; iLow++) {
            if (cleanAllProductListLower[i] === allProductList[iLow].toLowerCase() && check == 0) {

                cleanAllProductList.push(allProductList[iLow]);
                check = 1;
            }
        }
    }

    if (filterArray !== undefined) {//Creation de la liste sans le filtre selectionné
        console.log("pas definit prod");
        filterArray.forEach(filter => {            //Tu prends chaque filtre du tableau des filtres selectionne et pour chacun
            if (filter.classList.contains("productItem")) {
                cleanAllProductList.forEach(product => {
                    console.log(filter.innerText);
                    console.log(product);
                    if (filter.innerText !== product) {
                        cleanAllProductListSort.push(product);
                        //console.log(cleanAllProductListSort)
                    }
                });
            }//si le filtre selectionné contient prodctItem, alors

        });

        /**
         *Ajoute ça au autre filtre et normalement c'est bon
        */
        if (cleanAllProductListSort.length < 1) {
            cleanAllProductList.forEach(product => {
                cleanAllProductListSort.push(product);

            });
        }

    } else {

        cleanAllProductList.forEach(item => {
            cleanAllProductListSort.push(item);
        });
    }
    return (cleanAllProductListSort);
}

/*Fonction d'affichage d'ajout des ingredients à la liste*/
function displayProductList(cleanAllProductList) {

    const IngredientListe = document.querySelector(".ingredientList");
    IngredientListe.innerHTML = "";
    cleanAllProductList.forEach(element => {
        IngredientListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light border-0 p-3 productItem">${element}</li>
            `
        );
    });

    return (IngredientListe);
}

//fonction de filtre des appareils
function cleanApplianceList(recipeList, filterArray) {
    const allApplianceList = [];
    const cleanAllApplianceListSort = [];
    recipeList.forEach(item => {
        allApplianceList.push(item.appliance);
    });

    const cleanAllApplianceList = [...new Set(allApplianceList)];

    if (filterArray !== undefined) {//Creation de la liste sans le filtre selectionné
        cleanAllApplianceList.forEach(item => {
            cleanAllApplianceListSort.push(item);
        });
        filterArray.forEach(filter => {            //Tu prends chaque filtre du tableau des filtres selectionne et pour chacun
            if (filter.classList.contains("applianceItem")) {
                console.log(filter.innerText);
                cleanAllApplianceList.forEach(product => {
                    console.log(product);
                    if (filter.innerText == product) {
                        cleanAllApplianceListSort.pop();
                    }
                });
            }
        });
    } else {
        cleanAllApplianceList.forEach(item => {
            cleanAllApplianceListSort.push(item);
        });
    }
    return (cleanAllApplianceListSort);
}

/*Fonction d'ajout des appareils à la liste*/
function displayApplianceList(cleanAllApplianceList) {

    const applianceListe = document.querySelector(".appareilsList");
    applianceListe.innerHTML = "";
    cleanAllApplianceList.forEach(element => {
        applianceListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light border-0 p-3 applianceItem">${element}</li>
            `
        );
    });
}

//fonction de filtre des ustensiles
function cleanUstensilsList(recipeList, filterArray) {

    const allUstensilsList = [];
    const allUstensilsListLower = [];
    const cleanAllUstensilesList = [];
    const cleanAllUstensilesListSort = [];

    recipeList.forEach(item => {
        item.ustensils.forEach(ustensil => {
            allUstensilsList.push(ustensil);
            allUstensilsListLower.push(ustensil.toLowerCase());

        });
    });

    let cleanAllUstensilsListLower = [... new Set(allUstensilsListLower)];

    for (let i = 0; i < cleanAllUstensilsListLower.length; i++) {
        let check = 0;
        for (let iLow = 0; iLow < allUstensilsList.length; iLow++) {
            if (cleanAllUstensilsListLower[i] === allUstensilsList[iLow].toLowerCase() && check == 0) {
                cleanAllUstensilesList.push(allUstensilsList[iLow]);
                check = 1;
            }
        }
    }
    if (filterArray !== undefined) {//Creation de la liste sans le filtre selectionné

        filterArray.forEach(filter => {            //Tu prends chaque filtre du tableau des filtres selectionne et pour chacun
            if (filter.classList.contains("ustensileItem")) {
                cleanAllUstensilesList.forEach(product => {
                    if (filter.innerText !== product) {
                        console.log(product);
                        console.log(filter.innerText);
                        cleanAllUstensilesListSort.push(product);
                    }
                });
            }
        });

        if (cleanAllUstensilesListSort.length < 1) {
            cleanAllUstensilesList.forEach(product => {
                cleanAllUstensilesListSort.push(product);

            });
        }
    } else {
        cleanAllUstensilesList.forEach(item => {
            cleanAllUstensilesListSort.push(item);
        });
    }


    return (cleanAllUstensilesListSort);
}

//fonction d'ajout des ustensils à la liste
function displayUstensilList(cleanAllUstensilesList) {

    const ustensilesListe = document.querySelector(".ustensilesList");
    ustensilesListe.innerHTML = " ";

    cleanAllUstensilesList.forEach(element => {
        ustensilesListe.insertAdjacentHTML(
            "beforeend",
            `
            <li class="text-light p-3 ustensileItem">${element}</li>
            `
        );
    });
}

//fonction de recuperation des recettes triées
function recipeSort() {
    const searchString = document.querySelector(".searchbar").value;
    const recipesArray = Array.from(recipes); //copie de la liste des recettes

    //renvoi le tableau de filtre si des filtres ont été selectionné
    // let allFilterActivated = document.querySelectorAll(".filterSelected > li")
    // const filterArray = []
    // //creation du tableau des filtre selectionné
    // allFilterActivated.forEach(items => {
    //     filterArray.push(items)

    // })
    const cleanMergeRecipe = filterRecipe(recipesArray, searchString);

    return (cleanMergeRecipe);
}
