//J'initialise mon marionetiste
async function init() {
    // console.log(recipes[1]);
    const { ingredients, equipment, tools, recette } = recipes
    const ingredient = recipes
    displayRecipes()
}

//Fonction pour organiser
function displayRecipes() {
    // console.log('Je suis passé par là');
    // console.log(recipes);
    const recipesSection = document.querySelector(".allRecipes");

    recipesSection.classList.add("container",);


    const recipeCont = document.querySelector(".allRecipes")
    const recipeRow = document.createElement("div")
    recipeRow.classList.add("row")
    recipeCont.appendChild(recipeRow)



    for (let i = 0; i < recipes.length; i++) {
        let newRecipe = new Recipes(recipes[i])
        let article = newRecipe.createRecipe()
        recipeRow.appendChild(article);
        console.log(recipes.length);

    }
    // console.log(article);

    // allRecipes.insertAdjacentHTML(

    //     "beforeend",
    //     `
    //     <div class="row text-center flex-wrap mt-5">
    //     <p class="col bg-primary text-light">Maxime</p>
    //     <p class="col bg-success text-light">est le meilleur</p>
    //     <p class="col bg-secondary text-light">carreleur</p>
    //     <p class="col bg-warning text-secondary">du monde</p>
    //     </div>
    // `
    // )

}



init();