async function fetchRecipes() {
    const url = "http://localhost:5500/api/recipes.json";
    return fetch(url)
        .then(function (recipes) {
            return recipes.json();
        })
        .catch(function (error) {
            console.log("Il y a eu un problème avec l\'opération fetch : " + error.message);
        });
}