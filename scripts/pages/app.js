let recipes = []
async function init() {
    const fetchRecipesArray = await fetchRecipes();
    recipes = fetchRecipesArray.recipes;
    displayAll(recipes);
    searchBar(fetchRecipesArray);
}
init();