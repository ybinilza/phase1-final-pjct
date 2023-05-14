const Url = `  http://localhost:3000/recipe`;
const recipeContainer = document.querySelector("#recipe-container");
const textScrh = document.querySelector("#text-search");
const btnfind = document.querySelector(".btn");

btnfind.addEventListener("click", () => loadRecipes(textScrh.value));


let inputVal = "";



textScrh.addEventListener("keyup", (e) => {
    inputVal = textScrh.value;
    if (e.keyCode === 13) {
        loadRecipes();
    }
})


function loadRecipes() {
    
    fetch("http://localhost:3000/recipe")
        .then((res) => res.json())
        .then((data) => renderRecipes1(data))
        .catch((error) => console.log(error));

}
loadRecipes()


function renderRecipes1(recipeObject) {
    console.log(`inputval = ${inputVal}`)
    recipeContainer.innerHTML = "";
    let label = "";
    let image = "";
    let prepSteps = "";
    let flag = ""
    recipeObject.forEach((objc) => {
        label = objc.label;
        label = label.toLowerCase();
        inputVal = inputVal.toLowerCase();
        flag = label.includes(inputVal);
        //onsole.log(flag);
        image = objc.image;
        prepSteps = getRecipeSteps(objc.ingredientLines);
        if (flag === true) {
            label = label.toUpperCase();
            const htmlStr = `<div class="receipe">
            <div class="receipe-title">${label}</div>
            <div class="receipe-img">
                <img src="${image}" alt="chicken">
            </div>
            <div class="receipe-text">
                <ul>
                    ${prepSteps}
                </ul>
            </div>
            
            </div>`;
            recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
        }

    })

};


function getRecipeSteps(ingredientLines) {
    let str = "";
    for (let step of ingredientLines) {
        str = str + `<li>${step}</li>`;
    }
    return str;

}