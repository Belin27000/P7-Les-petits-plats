let searchRecipes = document.querySelector(".searchbar");
searchRecipes.innerText = " ";
//Fonction de recherche des recettes avec la searchbar principale
function searchBar(recipes) {
    searchRecipes.addEventListener("keyup", () => {
        if (searchRecipes.value.length < 3) {
            let filterTagOption = 'searchBarEmpty'
            let tagResult = tagFilter(recipes, filterTagOption)
            displayAll(tagResult);
            return;
        }
        let filterTagOption = 'searchBarFilled'
        let tagResult = tagFilter(recipes, filterTagOption)
        displayAll(tagResult)
    });
}


//---Algo2 - fonction de tri des recettes en fonction des filtres déjà cliqué---//
function tagFilter(recipes, filterTagOption) {
    let newRecipes = [];

    recipes.forEach(recipe => {
        let keep = true;
        allTags.forEach(tag => {
            switch (tag.type) {
                case 'appliance':
                    if (!recipe.appliance.toLowerCase().match(tag.value.toLowerCase())) {
                        keep = false;
                    }
                    break;

                case 'ingredients':
                    const tagIngredient = [];
                    let recipeIngredients = recipes.ingredients;
                    recipeIngredients.forEach(ingre => {
                        let ingredientRecipe = ingre.ingredient.toLowerCase();
                        let tagValue = tag.value.toLowerCase();
                        let result = ingredientRecipe.localeCompare(tagValue);//compare les 2 chaine de caractères afin de renvoyer uniquement le resultat identiques renvoi 0 si identique
                        if (result == 0) {
                            tagIngredient.push(ingre);
                        }
                    });
                    if (tagIngredient.length == 0) {
                        keep = false;
                    }
                    break;

                case 'ustensils':
                    const tagUstensil = [];
                    let recipeUstensil = recipe.ustensils;
                    recipeUstensil.forEach(ustensil => {
                        let ustensilRecipe = ustensil.toLowerCase();
                        let tagValue = tag.value.toLowerCase();
                        let result = ustensilRecipe.localeCompare(tagValue);//compare les 2 chaine de caractères afin de renvoyer uniquement le resultat identiques renvoi 0 si identique
                        if (result == 0) {
                            tagUstensil.push(ustensil);
                        }
                    });

                    if (tagUstensil.length == 0) {
                        keep = false;
                    }
                    break;
            }
        });
        if (filterTagOption === 'searchBarEmpty' && keep) {
            newRecipes.push(recipe);

        } else if (filterTagOption === 'searchBarFilled' && keep) {
            let ingredientString = ''; // On initialise une variable d'une chaîne de caractère vide
            let recipeArray = recipe.ingredients; // on charge le tableau des ingredients pour chaque recettes
            recipeArray.forEach(item => {
                // On parcourt les ingrédients d'une recette
                ingredientString += item.ingredient + ' '; // On ajoute à la variable de chaîne de caractère, les ingrédients de chaque recette parcourue
            });

            // Vérification du champs saisie pour ne retourner que les recettes qui contiennent la valeur saisie par l'utilisateur
            if (recipe.name.toLowerCase().match(searchRecipes.value.toLowerCase()) || recipe.description.toLowerCase().match(searchRecipes.value.toLowerCase()) || ingredientString.toLowerCase().match(searchRecipes.value.toLowerCase())) {
                newRecipes.push(recipe);
            }
        }
    });
    return newRecipes
}