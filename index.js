function loadRecipes() {
    
    fetch("http://localhost:3000/recipe")
        .then((res) => res.json())
        .then((data) => renderRecipes1(data))
        .catch((error) => console.log(error));

}
loadRecipes()