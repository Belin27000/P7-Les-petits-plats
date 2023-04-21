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
        const article = document.createElement('article')
        article.insertAdjacentHTML(
            "beforeend",
            `
            <div class="card col-3">
            <img class="card-img-top" src="..." alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `
        )
        return (article)
    }


}