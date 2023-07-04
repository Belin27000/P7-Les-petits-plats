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

//---Algo1 - fonction de tri des recettes en fonction des filtres déjà cliqué---//
function tagFilter(recipes, filterTagOption) {
    console.log(recipes.length);
    let newRecipes = [];
    // console.(allTags);
    for (let recipe of recipes) {
        let keep = true;
        for (const tag of allTags) {
            switch (tag.type) {
                case 'appliance':
                    if (!recipe.appliance.toLowerCase().match(tag.value.toLowerCase())) {
                        keep = false;
                    }
                    break;

                case 'ingredients':
                    const tagIngredient = [];
                    for (const ingre of recipe.ingredients) {
                        let ingredientRecipe = ingre.ingredient.toLowerCase();
                        let tagValue = tag.value.toLowerCase();
                        let result = ingredientRecipe.localeCompare(tagValue);//compare les 2 chaine de caractères afin de renvoyer uniquement le resultat identiques renvoi 0 si identique
                        if (result == 0) {
                            tagIngredient.push(ingre);
                        }
                    }
                    if (tagIngredient.length == 0) {
                        keep = false;
                    }
                    break;

                case 'ustensils':
                    const tagUstensil = [];
                    for (const ustensil of recipe.ustensils) {
                        let ustensilRecipe = ustensil.toLowerCase();
                        let tagValue = tag.value.toLowerCase();
                        let result = ustensilRecipe.localeCompare(tagValue);//compare les 2 chaine de caractères afin de renvoyer uniquement le resultat identiques renvoi 0 si identique

                        if (result == 0) {
                            tagUstensil.push(ustensil);
                        }
                    }
                    if (tagUstensil.length == 0) {
                        keep = false;
                    }
                    break;
            }
        }
        if (filterTagOption === 'searchBarEmpty' && keep) {
            newRecipes.push(recipe);

        } else if (filterTagOption === 'searchBarFilled' && keep) {
            let ingredientString = ''; // On initialise une variable d'une chaîne de caractère vide
            for (const item of recipe.ingredients) {
                // On parcourt les ingrédients d'une recette
                ingredientString += item.ingredient + ' '; // On ajoute à la variable de chaîne de caractère, les ingrédients de chaque recette parcourue
            }
            // Vérification du champs saisie pour ne retourner que les recettes qui contiennent la valeur saisie par l'utilisateur
            if (recipe.name.toLowerCase().match(searchRecipes.value.toLowerCase()) || recipe.description.toLowerCase().match(searchRecipes.value.toLowerCase()) || ingredientString.toLowerCase().match(searchRecipes.value.toLowerCase())) {
                newRecipes.push(recipe);
            }
        }
    }
    return newRecipes;
}