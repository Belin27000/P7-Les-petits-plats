const searchInput = document.querySelector(".form-control")
const filterArrow = document.querySelectorAll(".filterArrow button")
const filterCont = document.querySelectorAll(".filterArrow")
const ingredientInput = document.querySelector(".inputingredient")
const applianceInput = document.querySelector(".inputAppareils")
const ustensilInput = document.querySelector(".inputUstensiles")
let recipesArray = Array.from(recipes)

//J'initialise mon init
async function init() {

    //Affiche toutes les recettes et les filtres directement au lancement de la page
    displayRecipes(recipesArray);
    filterSort(recipesArray);
    this.recipesArray = recipesArray;
    searchInput.addEventListener("input", filterData) //Recherche les recettes du champs recherche dans searchRecipe.js
    ingredientInput.addEventListener("input", ingredientFilter) //Filtre les ingrédients du champs recherche dans filterInput.js
    applianceInput.addEventListener("input", appareilFilter) //Filtre les appareils du champs recherche dans filterInput.js
    ustensilInput.addEventListener("input", ustensilFilter) //Filtre les appareils du champs recherche dans filterInput.js
    displayFilter();

}
// var option = document.onclick

//Fonction d'affichage de toutes les recettes
function displayRecipes(recipesArray, noRecipe) {
    //creation et ajout du container pour recevoir les recettes
    const recipeCont = document.querySelector(".allRecipes")
    recipeCont.classList.add("container");
    // const recipeRow = document.querySelector(".allRecipes")
    const recipeRow = document.createElement("div")
    recipeRow.classList.add("row")
    recipeCont.appendChild(recipeRow)

    console.log(recipesArray);

    if (recipesArray.length === 0) {
        //Message d'infomation qu'aucune recette n'a ete trouve
        console.log(noRecipe);

        recipeRow.appendChild(noRecipe)

    } else {
        //creation de la recette avec la factory
        recipesArray.forEach(item => {
            // console.log(item);
            let newRecipe = new Recipes(item)
            let article = newRecipe.createRecipe()
            recipeRow.appendChild(article);
            article.setAttribute("tabindex", "0")

            const addIngredient = document.querySelector(".ingredientsList_" + item.id)

            item.ingredients.forEach(products => {
                let product = products.ingredient
                let quantité = products.quantity
                let unite = products.unit

                if (unite !== undefined) {
                    const produit = document.createElement("li")
                    produit.classList.add("ingreList")
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                    <p class="product">${product}</p><p>${`: `} ${quantité} ${unite}</p>
            `
                    )
                    addIngredient.appendChild(produit)

                } else if (quantité !== undefined) {

                    const produit = document.createElement("li")
                    produit.classList.add("ingreList")
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                <p class="product">${product}</p> <p>${`: `} ${quantité}</p>
            `
                    )
                    addIngredient.appendChild(produit)

                } else {
                    const produit = document.createElement("li")
                    produit.classList.add("ingreList")
                    produit.insertAdjacentHTML(
                        "beforeend",
                        `
                <p class="product"> ${product}</p >
                    `
                    )
                    addIngredient.appendChild(produit)

                }
            });

        });
    }


};

/*Fonction d'affichage des differents filtres au clique*/
let i = 0
function displayFilter() {

    let AllListeBtn = document.querySelectorAll(".allFilter");
    let allUl = document.querySelectorAll(".allList")

    AllListeBtn.forEach(Btn => {
        btnArrow = Btn.querySelector("button")
        btnArrow.addEventListener("click", function (ul) {
            ul = Btn.querySelector("ul")
            console.log(ul.length);
            allUl.forEach(liste => {//ferme les filtres non selectionné au click

                if (!liste.classList.contains("d-none") && ul != liste) {
                    liste.classList.add("d-none")
                }
            })
            // console.log(ul);
            ul.classList.toggle("d-none");
            ul.classList.add("list");
            selectFilter()
            i++
            console.log(i);
        })
    })
}
//function dajout du filtre selectionné
function selectFilter() {

    let AllLi = document.querySelectorAll(".allList > li");
    let allFilterActivated
    const filterActivated = document.querySelector(".filterSelected")

    // console.log(AllLi);

    AllLi.forEach(li => {

        li.addEventListener("click", function (e) {
            let targetValue = e.target.innerText


            // console.log(allFilterActivated.length);


            if (e.target.classList.contains("productItem")) {
                console.log("produit");
                // let targetValue = checkLi(e);
                // allFilterActivated = document.querySelectorAll(".filterSelected > li")
                // console.log(allFilterActivated);
                let controlResult = control()
                console.log(controlResult);
                if (controlResult != 1) {

                    filterActivated.insertAdjacentHTML(
                        "beforeend",
                        `
                        <li class="text-light border-0 productItem bg-primary">${targetValue}<i class="far fa-times-circle"></i></li>
                        `
                    )
                    li.remove()
                }
                console.log(allFilterActivated);


            } else if (e.target.classList.contains("applianceItem")) {
                console.log("appliance");
                let controlResult = control()
                console.log(controlResult);
                if (controlResult != 1) {

                    filterActivated.insertAdjacentHTML(
                        "beforeend",
                        `
                    <li class="text-light border-0 applianceItem">${targetValue}<i class="far fa-times-circle"></i></li>
                    `
                    )
                    li.remove()
                }
                console.log(allFilterActivated);

            } else if (e.target.classList.contains("ustensileItem")) {
                console.log("ustensile");
                let controlResult = control()
                console.log(controlResult);
                if (controlResult != 1) {

                    filterActivated.insertAdjacentHTML(
                        "beforeend",
                        `
                            <li class="text-light ustensileItem">${targetValue}<i class="far fa-times-circle"></i></li>
                            `
                    )
                    li.remove()
                }
                console.log(allFilterActivated);
            }
            function control() {
                let control = 0
                allFilterActivated = document.querySelectorAll(".filterSelected > li")
                console.log(targetValue);
                console.log(allFilterActivated.length);
                if (allFilterActivated.length > 0) {
                    let lastAllFilterActivated = allFilterActivated[allFilterActivated.length - 1].innerText
                    if (targetValue === lastAllFilterActivated) {
                        control = 1
                    }
                    console.log(control);

                }
                return control

            }
        })
        // let filterNb = allFilterActivated.length
        // console.log(filterNb);

        // allFilterActivated.forEach(filt => {

        //     console.log(filt);
        //     console.log(targetValue);
        // })

        // if (filterNb != 0) {
        //     console.log(allFilterActivated[filterNb]);
        //     if (targetValue === allFilterActivated[filterNb].innerText) {
        //         console.log("On y arrive");
        //     }
        // }


        // console.log(allFilterActivated);
        // const recipeRow = document.querySelector(".row")
        // recipeRow.innerHTML = ""
        // displaySelectedFilter()
    })
}
function displaySelectedFilter() {
    let allFilterActivated = document.querySelectorAll(".filterSelected > li")
    const filterArray = []
    console.log(allFilterActivated);
    //creation du tableau des filtre selectionné
    allFilterActivated.forEach(items => {
        filterArray.push(items)

    })
    console.log(filterArray);
    const searchString = searchInput.value
    const cleanMergeRecipe = filterRecipe(recipesArray, searchString, filterArray)
    console.log(cleanMergeRecipe);
    let article = noRecipe();
    console.log(article);

    // const recipeRow = document.querySelector(".row")
    // recipeRow.innerHTML = ""
    displayRecipes(cleanMergeRecipe, article);
    filterSort(cleanMergeRecipe)
    return cleanMergeRecipe
}

init();

