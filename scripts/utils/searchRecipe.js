const productArray = [] //initialisation du tableau de filtre
const cleanMergeRecipe = []

function filterData(e) {

    const recipeRow = document.querySelector(".allRecipes")
    const searchString = e.target.value.toLowerCase();
    let recipesArray = Array.from(recipes)
    // console.log(recipesArray);

    let i = 0
    if (searchString.length >= 3) {

        recipeRow.innerHTML = ""

        // appel de la fonction plus bas 
        // mais il faut donner les 3 charactere 
        recipesArray.forEach(item => {
            item.ingredients.forEach(products => {

                let product = products.ingredient
                if (product.toLowerCase().includes(searchString)) {
                    productArray.push(item)
                    // console.log(productFilter);
                    // console.log(productArray);
                }
            })
        })
        console.log(productArray);
        const filteredArr = recipesArray.filter(el => el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString))
        const mergeRecipe = [].concat(productArray, filteredArr);
        const cleanMergeRecipe = [...new Set(mergeRecipe)]//suppression des doublons
        console.log(cleanMergeRecipe);
        displayRecipes(cleanMergeRecipe)
        // console.log(filteredArr);
    } else if (i === 0) {
        recipeRow.innerHTML = ""
        displayRecipes(recipesArray)
        filterSort(recipesArray)

        i = 1
        console.log(i);
    }



    // fonction qui fait la rechercher (algo)


}
