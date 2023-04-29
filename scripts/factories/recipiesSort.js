/**
 * La classe Recipes représente la structure de base pour toutes les recettes
 */

class Recipes {
    /**
     * Utilisation d'un construcor pour la création d'une nouvelle recette
     * @constructor
     * @param {Object} recipe - Object contenant les informations de la recette
     * @param {number} recipe.id - L'ID unique de la recette
     * @param {string} recipe.name - Le nom de la recette
     * @param {object} recipe.ingredients - liste des ingredients de la recette
     * @param {number} recipe.time - Le temps de préparation de la recette
     * @param {string} recipe.description - La recette
     * @param {string} recipe.appliance - Listes des appareils
     * @param {Object} recipe.ustensils - Listes des ustensils de la recette
     */

    constructor(recipe) {
        const { id, name, ingredients, time, description, appliance, ustensils } = recipe;
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }

    createRecipe() {
        // console.log(this.ingredients);

        const article = document.createElement('div')
        article.classList.add("col-xl-4", "card", "mb-5", "border-0", "p-0")
        article.insertAdjacentHTML(
            "beforeend",
            `
                    <img class="card-img-top" src="https://placehold.co/380x178" alt="Card image cap">
                    <div class="card-body bg-light rounded-bottom-3">
                        <div class="d-flex flex-row justify-content-between">
                            <h4 class="card-title">${this.name}</h4>
                            <div class="d-flex flex-row recipeTime">
                                <i class="far fa-clock pe-3"></i>${this.time}<p class="ms-1">min</p>
                            </div>
                        </div>
                        <div class="recipe">
                            <ul class="ingredientsList_${this.id} ingredientList"></ul>
                            <div class="recipeDes">
                                <p >${this.description}</p>
                            </div>
                        </div>
                        </div>
                        `
        )

        return (article)
    }

}

