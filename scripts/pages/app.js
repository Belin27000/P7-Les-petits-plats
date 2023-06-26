let recipes = []
let newRecipes = []
async function init() {
    const fetchRecipesArray = await fetchRecipes();
    recipes = fetchRecipesArray.recipes;
    newRecipes = recipes
    displayAll(recipes);
    searchBar(recipes);
}
init();