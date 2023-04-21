//J'initialise mon marionetiste
async function init() {
    // console.log(recipes[1]);
    const { ingredients, equipment, tools, recette } = recipes
    const ingredient = recipes
    displayRecipes()
}

//Fonction pour organiser
function displayRecipes() {
    console.log('Je suis passé par là');
    console.log(recipes);
    const recipesSection = document.querySelector("body");

    const allRecipes = document.createElement("div")
    allRecipes.classList.add("container");
    recipesSection.appendChild(allRecipes)

    let newRecipe = new Recipes(recipes[1])
    let article = newRecipe.createRecipe()
    console.log(article);
    allRecipes.appendChild(article);

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