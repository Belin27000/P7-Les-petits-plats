const productArray = [] //initialisation du tableau de filtre
let cleanMergeRecipe = []


function filterData(e) {
    const recipeRow = document.querySelector(".allRecipes")
    const searchString = e.target.value.toLowerCase();//stockage du texte entré dans la searchBar
    const recipesArray = Array.from(recipes) //copie de la liste des recettes
    let searchbar = document.querySelector(".searchbar");
    let i = 0



    if (searchString.length >= 3) {

        recipeRow.innerHTML = ""

        //recherche les recettes correspondante au texte taper dans la searchBar
        const cleanMergeRecipe = filterRecipe(recipesArray, searchString)

        let article = noRecipe();

        displayRecipes(cleanMergeRecipe, article);

        if (cleanMergeRecipe.length === 0) {
            initFilter()
        } else {
            initFilter()
            filterSort(cleanMergeRecipe);
        }
        // console.log(cleanMergeRecipe);
    } else {
        // if (i === 0)
        initFilter()
        // console.log(cleanMergeRecipe);
        recipeRow.innerHTML = ""
        displayRecipes(recipesArray)

        i = 1
    }



    // fonction qui fait la rechercher (algo)
    //C'est ici que je dois faire le deuxieme algo
    //change foreach et filter en for
    function filterRecipe() {

        //vérifie si le texte recherché est dans la liste de produuit des recettes
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

        //On filtre la liste sans doublons
        const filteredCleanMergeRecipe = cleanMergeRecipe.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))

        return (filteredCleanMergeRecipe)
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
}
