let recipes = [];

async function init() {
    const fetchRecipesArray = await fetchRecipes();

    displayAll(fetchRecipesArray);
}
init();