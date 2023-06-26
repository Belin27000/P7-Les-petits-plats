let searchRecipes = document.querySelector(".searchbar");
searchRecipes.innerText = " ";
//Fonction de recherche des recettes avec la searchbar principale
function searchBar(recipes) {
    searchRecipes.addEventListener("keyup", () => {
        if (searchRecipes.value.length < 3) {
            let filterTagOption = 'one'
            let tagResult = tagFilter(recipes, filterTagOption)
            displayAll(tagResult);
            return;
        }
        let filterTagOption = 'two'
        let tagResult = tagFilter(recipes, filterTagOption)
        displayAll(tagResult)
    });
}

//---fonction de tri des recettes en fonction des filtres déjà cliqué---//
function tagFilter(recipes, filterTagOption) {
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
                        let result = ingre.ingredient.toLowerCase().match(tag.value.toLowerCase())
                        if (result && result.length > 0) {
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
                        let result = ustensil.toLowerCase().match(tag.value.toLowerCase());

                        if (result && result.length > 0) {
                            tagUstensil.push(ustensil);
                        }
                    }
                    if (tagUstensil.length == 0) {
                        keep = false;
                    }
                    break;
            }

        }
        // console.(keep);
        if (filterTagOption === 'one' && keep) {
            newRecipes.push(recipe);

        } else if (filterTagOption === 'two' && keep) {
            let ingredientString = ''; // On initialise une variable d'une chaîne de caractère vide
            for (const item of recipe.ingredients) {
                // On parcourt les ingrédients d'une recette
                ingredientString += item.ingredient + ' '; // On ajoute à la variable de chaîne de caractère, les ingrédients de chaque recette parcourue
            }

            // Vérification du champs saisie pour ne retourner que les recettes qui contiennent la valeur saisie par l'utilisateur
            if (recipe.name.toLowerCase().match(searchRecipes.value.toLowerCase()) || recipe.description.toLowerCase().match(searchRecipes.value.toLowerCase()) || ingredientString.toLowerCase().match(searchRecipes.value.toLowerCase())) {
                newRecipes.push(recipe)
            }
        }
    }
    return newRecipes
}
