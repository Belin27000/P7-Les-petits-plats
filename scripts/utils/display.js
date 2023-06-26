//Fonction d'affichage de toutes les recettes
function displayAll(recipes) {
    displayData(recipes);
    creationFilter(recipes);
    tagClicked(recipes);



}

//Fonction d'affichage des recettes
function displayData(recipes) {
    const recipesSection = document.querySelector(".allRecipes");
    recipesSection.innerHTML = " ";
    recipesSection.classList.add("container", "d-flex", "flex-wrap");

    if (recipes.length == 0) {
        // Affichage du message si la recette ne donne auncun resultat
        let article = noRecipe()
        recipesSection.appendChild(article);

    } else {

        recipes.forEach(recipe => {

            let newRecipe = new FactoRecipes(recipe);

            const Card = newRecipe.createRecipe(recipe);
            recipesSection.appendChild(Card);
        });
    }

}

//message si aucune recette n'est trouvée
function noRecipe() {

    const article = document.createElement('div');
    article.classList.add("col-xl-4", "card", "mb-5", "border-0", "p-0");
    article.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card-body bg-light rounded-bottom-3">
                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex flex-row recipeTime">
                        Aucune recette ne correspond à votre critère… vous pouvez
                        chercher « tarte aux pommes », « poisson », etc
                        </div>
                    </div>
                </div>
                    `
    );
    return (article);
}

//--- fonction d'affichage des dropdonws après création dans creationFilter dans le fichier filter.js---//

function displayFilterDropdown(dropdown) {
    let parentInputField = dropdown.parentNode;
    let dropdownInput = parentInputField.querySelector('.dropdown-input')
    console.log(dropdown);
    let dropdownList = [...dropdown.children]

    dropdownInput.addEventListener('keyup', (e) => {
        if (e.target.value.length > 0) {
            dropdownList.map((list) => {
                if (list.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return list
                } else {
                    list.style.display = 'none'
                }
            })
        } else {
            dropdownList.map((list) => {
                list.style.display = 'block'
            })
        }
    })

};