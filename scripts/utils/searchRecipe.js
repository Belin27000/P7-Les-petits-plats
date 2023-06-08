let productArray = [] //initialisation du tableau de filtre
let ingredientArray = []
let applianceArray = []
let finalArray = []
let cleanMergeRecipe = []


function filterData(e) {
    const recipeRow = document.querySelector(".allRecipes")
    const searchString = e.target.value.toLowerCase();//stockage du texte entré dans la searchBar



    if (searchString.length >= 3) {//gestion de l'affichage des recettes si on a plus de 3 caractères dans la searchBar

        recipeRow.innerHTML = ""

        //recherche les recettes correspondante au texte taper dans la searchBar
        const cleanMergeRecipe = filterRecipe(recipesArray, searchString)
        let article = noRecipe();

        displayRecipes(cleanMergeRecipe, article);

        if (cleanMergeRecipe.length === 0) {//remplli les filtres si il y a des recettes ou non
            initFilter()
        } else {
            initFilter()
            filterSort(cleanMergeRecipe);
        }

    } else {
        //Affiche toutes les recettes et filtres si moins de 3 caractères dans la searchbar principale
        initFilter()
        recipeRow.innerHTML = ""
        filterSort(recipesArray);
        displayRecipes(recipesArray)
        // selectFilter();
    }



    // fonction qui fait la rechercher (algo)
    //C'est ici que je dois faire le deuxieme algo
    //change foreach et filter en for




}
//message lorsque la recherche ne trouve pas de recette, ingrédients ou ustensile conrrespondant.
function noRecipe() {

    const article = document.createElement('div')
    article.classList.add("col-xl-4", "card", "mb-5", "border-0", "p-0")
    article.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card-body bg-light rounded-bottom-3">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex flex-row recipeTime">
                        Aucune recette ne correspond à votre critère… vous pouvez
                        chercher « tarte aux pommes », « poisson », etc
                        </div>
                    </div>
                </div>
                    `
    )
    return (article)
}

function filterRecipe(recipesArray, searchString, filterArray) {
    function simpleFilterRecipe() {

        // vérifie si le texte recherché est dans la liste de produit des recettes
        recipesArray.forEach(item => {
            item.ingredients.forEach(products => {

                let product = products.ingredient
                if (product.toLowerCase().includes(searchString)) {
                    productArray.push(item)
                }
            })
        })
        //vérifie si le texte recherché est dans le nom ou la description des recettes
        const filteredArr = recipesArray.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))
        const mergeRecipe = [].concat(productArray, filteredArr);
        let cleanMergeRecipe = [...new Set(mergeRecipe)] //suppression des doublons


        return (cleanMergeRecipe)
    }
    if (filterArray == undefined) { //trie des recettes uniquement avec la searchBar

        cleanMergeRecipe = simpleFilterRecipe()
        console.log(cleanMergeRecipe);
        return (cleanMergeRecipe)

    } else {//trie des recettes avec les filtres et la searchBar
        let productArray = []
        let applianceArray = []
        let ustensilArray = []
        cleanMergeRecipe = simpleFilterRecipe()



        cleanMergeRecipe.forEach(item => {//pour chaque recettes
            filterArray.forEach(filter => {//Tu prends chaque filtre du tableau des filtres selectionne et pour chacun
                filterText = filter.innerText
                if (filter.classList.contains("productItem")) {//si le filtre selectionné contient prodctItem, alors
                    item.ingredients.forEach(products => {//pour chaque produit de la recette on verifie qu'il contient le filtre
                        let product = products.ingredient
                        if (product.toLowerCase() === filterText.toLowerCase()) {// si il le contient, on l'ajoute a notre tableau de trie
                            ingredientArray.push(item)
                        }//sinon il n'est pas ajouté
                    })
                }
                if (filter.classList.contains("applianceItem")) {
                    let appliance = item.appliance
                    if (appliance.toLowerCase() === filterText.toLowerCase()) {// si il le contient, on l'ajoute a notre tableau de trie
                        applianceArray.push(item)
                        console.log(applianceArray);
                    }
                }
                if (filter.classList.contains("ustensileItem")) {
                    console.log(filterText.toLowerCase());
                    item.ustensils.forEach(ustensils => {
                        let ustensil = ustensils.ustensils
                        // console.log(ustensils);
                        if (ustensils.toLowerCase() === filterText.toLowerCase()) {// si il le contient, on l'ajoute a notre tableau de trie
                            ustensilArray.push(item)
                            console.log(ustensilArray);
                        }
                    })
                }
            })
        })
        //Renvoi le tableau filtré avec un seul type de filtre selectionné
        if (ingredientArray.length > 0 && applianceArray.length === 0 && ustensilArray.length === 0) {
            productArray = ingredientArray
        } else if (ingredientArray.length === 0 && applianceArray.length > 0 && ustensilArray.length === 0) {
            productArray = applianceArray
        } else if (ingredientArray.length === 0 && applianceArray.length > 0 && ustensilArray.length === 0) {
            productArray = ustensilArray
        }

        //Renvoi le tableau filtré avec tous les types de filtre selectionné
        if (ingredientArray.length > 0 && applianceArray.length > 0 && ustensilArray.length > 0) {
            ingredientArray.forEach(ingredientItemFilter => {
                applianceArray.forEach(appItemFilter => {
                    if (ingredientItemFilter === appItemFilter) {
                        ustensilArray.forEach(ustensilItemFilter => {
                            if (ingredientItemFilter === ustensilItemFilter) {
                                productArray.push(ingredientItemFilter)
                            }
                        })
                    }
                })
            })
        }
        //Renvoi le tableau filtré avec les filtres ingredient et appareil selectionnés uniquement
        if (ingredientArray.length > 0 && applianceArray.length > 0 && ustensilArray.length === 0) {
            ingredientArray.forEach(ingredientItemFilter => {
                applianceArray.forEach(appItemFilter => {
                    if (ingredientItemFilter === appItemFilter) {
                        productArray.push(ingredientItemFilter)
                    }
                })
            })
        }
        //Renvoi le tableau filtré avec les filtres ingredient et ustensil selectionnés uniquement
        if (ingredientArray.length > 0 && applianceArray.length === 0 && ustensilArray.length > 0) {
            ingredientArray.forEach(ingredientItemFilter => {
                ustensilArray.forEach(ustensilItemFilter => {
                    if (ingredientItemFilter === ustensilItemFilter) {
                        productArray.push(ingredientItemFilter)
                    }
                })
            })
        }
        //Renvoi le tableau filtré avec les filtres appareil et ustensil selectionnés uniquement
        if (ingredientArray.length === 0 && applianceArray.length > 0 && ustensilArray.length > 0) {
            applianceArray.forEach(appItemFilter => {
                ustensilArray.forEach(ustensilItemFilter => {
                    if (appItemFilter === ustensilItemFilter) {
                        productArray.push(appItemFilter)
                    }
                })
            })
        }

        // productArray = ingredientArray
        console.log(ingredientArray);
        console.log(applianceArray);
        console.log(ustensilArray);


        console.log(productArray);
        const filteredCleanMergeRecipe = productArray
        return (filteredCleanMergeRecipe)

    }


}

