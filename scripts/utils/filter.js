//--Fonction d'ajout des listes d'item dans chacun des dopdowns
function creationFilter(recipes) {
    console.log(recipes);
    let inputingredient = document.querySelector(".inputingredient");
    let ingredientsListContainer = document.querySelector(".ingredientList");
    inputingredient.innerHTML = " ";
    ingredientsListContainer.innerHTML = " ";
    let ingredientsList = [];

    let inputAppareils = document.querySelector(".inputAppareils");
    let AppareilsListContainer = document.querySelector(".appareilsList");
    AppareilsListContainer.innerHTML = " ";
    inputAppareils.innerHTML = " ";
    let appareilsList = [];

    let inputUstensiles = document.querySelector(".inputUstensiles");
    let UstensilesListContainer = document.querySelector(".ustensilesList");
    inputUstensiles.innerHTML = " ";
    UstensilesListContainer.innerHTML = " ";
    let ustensilesList = [];


    let dropdownInput = document.querySelectorAll(".dropdown-input");
    for (let i = 0; i < dropdownInput.length; i++) {
        const input = dropdownInput[i];
        let getInputId = input.getAttribute("id");

        switch (getInputId) {
            case "inputingredient":
                recipes.map((item) => {//recupère l'ensemble des ingredients des recettes
                    ingredientsList = [...ingredientsList, ...item.ingredients.map((i) => {
                        return i.ingredient.toLowerCase();
                    })];
                });

                //retrait des doublons
                ingredientsList = ingredientsList.filter((ingredient, index) => {
                    return ingredientsList.indexOf(ingredient) == index;
                });
                console.log(allTags);

                // On créé l'HTML pour chaque ingrédients
                for (let i = 0; i < ingredientsList.length; i++) {
                    let element = ingredientsList[i];

                    if (allTags.filter((e) => {
                        return e.value.toLowerCase() == element.toLowerCase();
                    }).length == 0) {
                        ingredientsListContainer.insertAdjacentHTML(
                            "beforeend",
                            `
                            <li><a class="dropdown-item" href="#">${element}</a></li>
                            `
                        );
                    }
                }
                console.log(ingredientsListContainer);
                displayFilterDropdown(ingredientsListContainer);
                break;

            case 'inputUstensiles':
                recipes.map((item) => {

                    ustensilesList = [...ustensilesList, ...item.ustensils.map((u) => {
                        return u.toLowerCase()
                    })]
                })

                // Retrait des doublons du tableau
                ustensilesList = ustensilesList.filter((ustensil, index) => {
                    return ustensilesList.indexOf(ustensil) == index
                })

                // On boucle ensuite sur le tableau pour que chaque ustensile créé du html
                for (let i = 0; i < ustensilesList.length; i++) {
                    let element = ustensilesList[i];

                    if (allTags.filter((e) => {
                        return e.value.toLowerCase() == element.toLowerCase()
                    }).length == 0) {
                        UstensilesListContainer.insertAdjacentHTML(
                            "beforeend",
                            `
                            <li><a class="dropdown-item" href="#">${element}</a></li>
                            `
                        );
                    }
                }
                console.log(UstensilesListContainer);
                displayFilterDropdown(UstensilesListContainer)
                break

            case 'inputAppareils':
                // On parcourt les recettes pour push chaque appareil dans le tableau
                recipes.map((item) => {
                    appareilsList.push(item.appliance)
                })

                // Retrait des doublons du tableau
                appareilsList = appareilsList.filter((appliance, index) => {
                    return appareilsList.indexOf(appliance) == index
                })
                // On boucle ensuite sur le tableau pour que chaque appareil créé du html
                for (let i = 0; i < appareilsList.length; i++) {
                    let element = appareilsList[i];
                    if (allTags.filter((e) => {
                        return e.value.toLowerCase() == element.toLowerCase()
                    }).length == 0) {

                        AppareilsListContainer.insertAdjacentHTML(
                            "beforeend",
                            `
                        <li><a class="dropdown-item" href="#">${element}</a></li>
                        `
                        );
                    }
                }
                displayFilterDropdown(AppareilsListContainer)
                break
        }

    }
}



