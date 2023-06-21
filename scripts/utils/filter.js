function creationFilter(recipes) {
    let inputingredient = document.querySelector(".inputingredient");
    inputingredient.innerHTML = " ";
    let ingredientsList = [];

    let inputAppareils = document.querySelector(".inputAppareils");
    inputAppareils.innerHTML = " ";
    let appareilsList = [];

    let inputUstensiles = document.querySelector(".inputUstensiles");
    inputUstensiles.innerHTML = " ";
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
                    console.log(element);
                }

        }

        console.log(ingredientsList);

    }
}