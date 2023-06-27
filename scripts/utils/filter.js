document.addEventListener("DOMContentLoaded", function () {// gestion de l'affichage des dropdown une fois le DOM chargé


    function init() {
        eventfilterclick();
    }

    init()

    function eventfilterclick() {
        let filterArrow = document.querySelectorAll(".filterArrow");

        filterArrow.forEach((Arrow) => {
            Arrow.addEventListener("click", function (event) {

                const containerDivUl = Arrow.closest("div.allFilter");
                let containerUl = containerDivUl.querySelector('.allList');
                containerUl.classList.toggle("d-none");//affichage du filtre au clique
                containerUl.classList.toggle("list")//mise en forme des listes au clique

                event.target.classList.toggle('select');
            });
        })
    }

});


//--Fonction d'ajout des listes d'item dans chacun des dopdowns
function creationFilter(recipes) {
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

                // On créé l'HTML pour chaque ingrédients
                for (let i = 0; i < ingredientsList.length; i++) {
                    let element = ingredientsList[i];

                    if (allTags.filter((e) => {
                        return e.value.toLowerCase() == element.toLowerCase();
                    }).length == 0) {
                        ingredientsListContainer.insertAdjacentHTML(
                            "beforeend",
                            `
                            <li><a class="dropdown-item p-2" href="#">${element}</a></li>
                            `
                        );
                    }
                }
                displayFilterDropdown(ingredientsListContainer)
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
                            <li><a class="dropdown-item p-2" href="#">${element}</a></li>
                            `
                        );
                    }
                }
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
                        <li><a class="dropdown-item p-2" href="#">${element}</a></li>
                        `
                        );
                    }
                }
                displayFilterDropdown(AppareilsListContainer)
                break
        }

    }
}



