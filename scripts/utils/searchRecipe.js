const productArray = [] //initialisation du tableau de filtre
let cleanMergeRecipe = []

function filterData(e) {
    const recipeRow = document.querySelector(".allRecipes")
    const searchString = e.target.value.toLowerCase();//stockage du texte entré dans la searchBar

    // let allFilterActivated = document.querySelectorAll(".filterSelected > li")
    // const filterArray = []
    // //creation du tableau des filtre selectionné
    // allFilterActivated.forEach(items => {
    //     filterArray.push(items)

    // })
    // console.log(filterArray.length);

    // if (filterArray.length > 0) {
    //     recipeRow.innerHTML = ""

    //     recipesArray = displaySelectedFilter() //copie de la liste des recettes
    //     console.log(recipesArray);
    // }

    if (searchString.length >= 3) {//gestion de l'affichage des recettes si on a plus de 3 caractères dans la searchBar

        recipeRow.innerHTML = ""

        //recherche les recettes correspondante au texte taper dans la searchBar
        const cleanMergeRecipe = filterRecipe(recipesArray, searchString)
        console.log(cleanMergeRecipe);
        let article = noRecipe();

        displayRecipes(cleanMergeRecipe, article);

        if (cleanMergeRecipe.length === 0) {//remplli les filtres si il y a des recettes ou non
            initFilter()
        } else {
            initFilter()
            filterSort(cleanMergeRecipe);
        }

        // console.log(cleanMergeRecipe);
    } else {
        console.log(recipesArray);
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


}

function filterRecipe(recipesArray, searchString, filterArray) {
    console.log(recipesArray);
    console.log(searchString.length);
    console.log(filterArray);

    if (filterArray == undefined) { //trie des recettes uniquement avec la searchBar

        // // vérifie si le texte recherché est dans la liste de produit des recettes
        // recipesArray.forEach(item => {
        //     item.ingredients.forEach(products => {

        //         let product = products.ingredient
        //         if (product.toLowerCase().includes(searchString)) {
        //             productArray.push(item)
        //         }
        //     })
        // })
        //vérifie si le texte recherché est dans le nom ou la description des recettes
        const filteredArr = recipesArray.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))
        const mergeRecipe = [].concat(productArray, filteredArr);
        let cleanMergeRecipe = [...new Set(mergeRecipe)] //suppression des doublons

        //On filtre la liste sans doublons
        const filteredCleanMergeRecipe = cleanMergeRecipe.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))
        return (filteredCleanMergeRecipe)

    } else {//trie des recettes avec les filtres et la searchBar

        const filteredArr = recipesArray.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))
        // console.log(filteredArr);

        filterArray.forEach(filter => {

            if (filter.classList.contains("productItem")) {
                console.log(filter.innerText);
                filteredArr.forEach(item => {
                    item.ingredients.forEach(products => {

                        let product = products.ingredient
                        if (product === filter.innerText) {
                            productArray.push(item)
                            console.log(productArray);
                        }
                    })
                })
            } else if (filter.classList.contains("applianceItem")) {


                console.log("appliance");
            } else if (filter.classList.contains("ustensileItem")) {
                console.log("ustensile");

            }

        })
        const filteredCleanMergeRecipe = productArray
        console.log(filteredCleanMergeRecipe);
        return (filteredCleanMergeRecipe)

    }


}

