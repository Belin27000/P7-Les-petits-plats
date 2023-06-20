/* eslint-disable no-unused-vars */
//Récupère la liste des recettes du fichier .json
async function fetchRecipes() {
    const url = "http://localhost:5500/api/recipes.json";
    return fetch(url)
        .then(function (recipes) {
            return recipes.json();
        })
        .catch(function (error) {
            // eslint-disable-next-line no-useless-escape
            console.log("Il y a eu un problème avec l\'opération fetch : " + error.message);
        });
}