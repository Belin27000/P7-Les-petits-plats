const searchInput = document.querySelector(".form-control");
const filterArrow = document.querySelectorAll(".filterArrow button");
const filterCont = document.querySelectorAll(".filterArrow");
const ingredientInput = document.querySelector(".inputingredient");
const applianceInput = document.querySelector(".inputAppareils");
const ustensilInput = document.querySelector(".inputUstensiles");
//J'initialise mon init
async function init() {
    const fetchRecipesArray = await fetchRecipes();
    console.log(fetchRecipesArray);
    const recipesArray = Object.entries(fetchRecipesArray.recipes);
    //Affiche toutes les recettes et les filtres directement au lancement de la page
    // filterSort(recipesArray);
    this.recipesArray = recipesArray;
    displayRecipes(recipesArray);
    searchInput.addEventListener("input", filterData); //Recherche les recettes du champs recherche dans searchRecipe.js
    ingredientInput.addEventListener("input", ingredientFilter); //Filtre les ingrédients du champs recherche dans filterInput.js
    applianceInput.addEventListener("input", appareilFilter); //Filtre les appareils du champs recherche dans filterInput.js
    ustensilInput.addEventListener("input", ustensilFilter); //Filtre les appareils du champs recherche dans filterInput.js
    displayFilter();

    let containerFilter = document.getElementsByClassName("filterSelected");
    containerFilter[0].addEventListener("change", deleteSelectedFilter());
}


// var option = document.onclick

//Fonction d'affichage de toutes les recettes
function displayRecipes(recipesArray, noRecipe) {
    console.log(recipesArray);
    //creation et ajout du container pour recevoir les recettes
    const recipeCont = document.querySelector(".allRecipes");
    recipeCont.classList.add("container");
    // const recipeRow = document.querySelector(".allRecipes")
    const recipeRow = document.createElement("div");
    recipeRow.classList.add("row");
    recipeCont.appendChild(recipeRow);


    if (recipesArray.length === 0) {
        //Message d'infomation qu'aucune recette n'a ete trouve

        recipeRow.appendChild(noRecipe);

    } else {
        //creation de la recette avec la factory
        recipesArray.forEach(item => {
            let newRecipe = new Recipes(item);
            let article = newRecipe.createRecipe();
            recipeRow.appendChild(article);
            article.setAttribute("tabindex", "0");

            const addIngredient = document.querySelector(".ingredientsList_" + item.id);

            item.ingredients.forEach(products => {
                let product = products.ingredient;
                let quantité = products.quantity;
                let unite = products.unit;

                if (unite !== undefined) {
                    const produit = document.createElement("li");
                    produit.classList.add("ingreList");
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                    <p class="product">${product}</p><p>${": "} ${quantité} ${unite}</p>
            `
                    );
                    addIngredient.appendChild(produit);

                } else if (quantité !== undefined) {

                    const produit = document.createElement("li");
                    produit.classList.add("ingreList");
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                <p class="product">${product}</p> <p>${": "} ${quantité}</p>
            `
                    );
                    addIngredient.appendChild(produit);

                } else {
                    const produit = document.createElement("li");
                    produit.classList.add("ingreList");
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                <p class="product"> ${product}</p >
                    `
                    );
                    addIngredient.appendChild(produit);

                }
            });

        });
    }


}

/*Fonction d'affichage des differents filtres au clique*/
function displayFilter() {

    let AllListeBtn = document.querySelectorAll(".allFilter");
    let allUl = document.querySelectorAll(".allList");

    AllListeBtn.forEach(Btn => {
        btnArrow = Btn.querySelector("button");
        btnArrow.addEventListener("click", function (ul) {
            ul = Btn.querySelector("ul");
            allUl.forEach(liste => {//ferme les filtres non selectionné au click

                if (!liste.classList.contains("d-none") && ul != liste) {
                    liste.classList.add("d-none");
                }
            });
            ul.classList.toggle("d-none");
            ul.classList.add("list");
            selectFilter();
        });
    });


}
//function d'ajout du filtre selectionné
function selectFilter() {

    let AllLi = document.querySelectorAll(".allList > li");
    let allFilterActivated;
    const filterActivated = document.querySelector(".filterSelected");
    let allUl = document.querySelectorAll(".allList");


    AllLi.forEach(li => {

        li.addEventListener("click", function (e) {
            let targetValue = e.target.innerText;

            if (e.target.classList.contains("productItem")) {
                //evite les doublons dans la liste de filtre selectioné
                let controlResult = control();
                if (controlResult != 1) {

                    filterActivated.insertAdjacentHTML(
                        "beforeend",
                        `
                        <li class="text-light border-0 productItem bg-primary">${targetValue}<i class="far fa-times-circle"></i></li>
                        `
                    );
                }


            } else if (e.target.classList.contains("applianceItem")) {
                let controlResult = control();
                if (controlResult != 1) {

                    filterActivated.insertAdjacentHTML(
                        "beforeend",
                        `
                    <li class="text-light border-0 applianceItem">${targetValue}<i class="far fa-times-circle"></i></li>
                    `
                    );
                }

            } else if (e.target.classList.contains("ustensileItem")) {
                let controlResult = control();
                if (controlResult != 1) {

                    filterActivated.insertAdjacentHTML(
                        "beforeend",
                        `
                            <li class="text-light ustensileItem">${targetValue}<i class="far fa-times-circle"></i></li>
                            `
                    );
                }
            }

            //Control si le dernier filtre selectionné est déjà affiché
            function control() {
                let control = 0;
                allFilterActivated = document.querySelectorAll(".filterSelected > li");

                if (allFilterActivated.length > 0) {
                    let lastAllFilterActivated = allFilterActivated[allFilterActivated.length - 1].innerText;
                    if (targetValue === lastAllFilterActivated) {
                        control = 1;
                    }

                }
                return control;
            }

            displaySelectedFilter();

            allUl.forEach(liste => {//ferme le filtre après la selection

                if (!liste.classList.contains("d-none")) {
                    liste.classList.add("d-none");
                }
            });


        });
    });
}

//triage des recette en fonction des filtre selectionnés
function displaySelectedFilter() {
    let allFilterActivated = document.querySelectorAll(".filterSelected > li");
    const filterArray = [];
    //creation du tableau des filtre selectionné
    allFilterActivated.forEach(items => {
        filterArray.push(items);

    });
    const searchString = searchInput.value;
    const mergeRecipe = filterRecipe(recipesArray, searchString, filterArray);
    let cleanMergeRecipe = [...new Set(mergeRecipe)];
    let article = noRecipe();

    const recipeCont = document.querySelector(".allRecipes");
    const recipeRow = document.querySelector(".row");
    recipeCont.removeChild(recipeRow);
    displayRecipes(cleanMergeRecipe, article);
    initFilter();
    filterSort(cleanMergeRecipe, filterArray);
    return cleanMergeRecipe;
}

function deleteSelectedFilter() {
    const allFilterActivated = document.querySelectorAll(".filterSelected>li");
    if (allFilterActivated.length > 0) {
        allFilterActivated.forEach(element => {
            element.addEventListener("click", function (e) {
                console.log(e);
                e.srcElement.parentNode.remove();

            });
        });
    }
}


init();

