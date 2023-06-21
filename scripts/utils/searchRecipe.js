let searchRecipes = document.querySelector(".searchbar");
searchRecipes.innerText = " ";
//Fonction de recherche des recettes avec la searchbar principale
function searchBar(recipes) {
    console.log("je cherche une recette");
    searchRecipes.addEventListener("keyup", () => {
        if (searchRecipes.value.length < 3) {
            displayAll(recipes);
            return;
        }
    });
}