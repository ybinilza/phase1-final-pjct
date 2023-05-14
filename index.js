
require('dotenv').config();
//console.log(process.env);

//import { config } from /home/binil/Development/code/phase-1/phase1-final-pjct/config.js ;
//import * from config.js;
//include(config.js);
//const appid= config.appId;
//const appkey=config.appKey; 

//const appId = "c3d67381";
//const appKey ="3940a41b8281896545315da4d6ed9a90";
//console.log(b);
//import { items } from "./utils.js";
const appid= process.env.APIID;
const appkey=process.env.APIKEY; 


const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appid}&app_key=${appkey}`;
const recipeContainer = document.querySelector("#recipe-container");
const textScrh = document.querySelector("#text-search");
const btnfind = document.querySelector(".btn");

btnfind.addEventListener("click", () => loadRecipes(textScrh.value));






textScrh.addEventListener("keyup", (e) => {
    const inputVal =textScrh.value;
    console.log(inputVal)
    loadRecipes(inputVal);
    if(e.keyCode === 13)
    {
        loadRecipes(inputVal);
    }
})

function loadRecipes(type = "chicken")
{
    const url =baseUrl + `&q=${type}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => renderRecipes(data.hits))
      .catch((error) => console.log(error));
}

loadRecipes()

const getRecipeSteps = ( ingredientLines = []) => {
    let str = "";
    for(let step of ingredientLines)
    {
        str=str + `<li>${step}</li>`;
    }
    return str;
};

const renderRecipes = (recipeList = []) => {
    recipeContainer.innerHTML="";
    recipeList.forEach((recipeObj) => {
        const {
            label : recipeTitle,
            ingredientLines,
            image : recipeImage,
         } = recipeObj.recipe;
         const recipestep = getRecipeSteps(ingredientLines);
        const htmlStr = `<div class="receipe">
        <div class="receipe-title">${recipeTitle}</div>
        <div class="receipe-img">
            <img src="${recipeImage}" alt="chicken">
        </div>
        <div class="receipe-text">
            <ul>
                ${recipestep}
            </ul>
        </div>
        
        </div>`;
 recipeContainer.insertAdjacentHTML("beforeend",htmlStr);

     });
};