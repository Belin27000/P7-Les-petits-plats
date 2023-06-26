let allTags = [];
// --- Fonction pour gérer les évènements liés aux clics sur les différents items des dropdowns, que la création des tags sous la barre de recherche, ainsi que le filtrage des recettes --- \\
function tagClicked(recipes) {
    let item = document.querySelectorAll(".dropdown-item")

    for (let i = 0; i < item.length; i++) {
        let tag = item[i];
        tag.addEventListener('click', (e) => {
            let focus = tag.closest("ul").getAttribute('data-typeFilter')
            allTags.push({ type: focus, value: tag.textContent })

            let tagBtn = document.createElement('button')
            tagBtn.classList.add('btn', 'btn-primary', 'tag', 'mx-1')
            tagBtn.setAttribute('type', 'submit')
            tagBtn.innerHTML = tag.innerHTML + `<i class="far fa-times-circle"></i>`
            switch (focus) {
                case 'ingredients':
                    tagBtn.classList.add("bg-primary")
                    document.getElementById("tag-container-ingredients").appendChild(tagBtn)
                    break
                case 'appliance':
                    tagBtn.classList.add("applianceItem")
                    document.getElementById("tag-container-appliances").appendChild(tagBtn)
                    break
                case 'ustensils':
                    tagBtn.classList.add("ustensileItem")
                    document.getElementById("tag-container-ustensils").appendChild(tagBtn)
                    break
            }



            let filteredRecipes = [];
            // Boucle sur les recettes afin de retenir celles qui correspondent aux tags.
            for (const recipe of recipes) {
                let isMatch = false;
                switch (focus) {
                    case 'appliance':
                        if (recipe.appliance.toLowerCase().match(tag.textContent.toLowerCase())) {
                            isMatch = true;
                        }
                        break;
                    case 'ingredients':
                        const ingredientsMatch = [];
                        for (const ingredient of recipe.ingredients) {
                            if (ingredient.ingredient.toLowerCase().match(tag.textContent.toLowerCase())) {
                                ingredientsMatch.push(true);
                            } else {
                                ingredientsMatch.push(false);
                            }
                        }
                        if (ingredientsMatch.includes(true)) {
                            isMatch = true;
                        }
                        break;
                    case 'ustensils':
                        const ustensilsMatch = [];
                        for (const ustensil of recipe.ustensils) {
                            if (ustensil.toLowerCase().match(tag.textContent.toLowerCase())) {
                                ustensilsMatch.push(true);
                            } else {
                                ustensilsMatch.push(false);
                            }
                        }
                        if (ustensilsMatch.includes(true)) {
                            isMatch = true;
                        }
                        break;

                }
                if (isMatch) {
                    filteredRecipes.push(recipe);
                }
            }
            newRecipes = filteredRecipes
            displayAll(newRecipes)


            tagBtn.addEventListener("click", () => {

                let updatedAllTags = [];
                for (let tag of allTags) {
                    if (tag.value !== tagBtn.textContent) {
                        updatedAllTags.push(tag);
                    }
                }
                allTags = updatedAllTags;

                // Prise en compte de l'input de la barre de recherche afin d'effectuer un nouveau tri à chaque tag cliqué et retiré
                if (searchRecipes.value.length <= 3) {
                    let filterTagOption = 'one';
                    tagFilter(recipes, filterTagOption)
                    console.log(recipes);
                    displayAll(recipes)
                    tagBtn.remove()
                    return
                }
                let filterTagOption = 'two';
                tagFilter(recipes, filterTagOption)
                displayAll(recipes)
                tagBtn.remove()

            })
        })
    }
}

