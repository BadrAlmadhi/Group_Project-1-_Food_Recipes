let searchInputEl = document.getElementById("search-input");
let searchContentEl = document.getElementsByClassName("search-content");
let searchButtonEl = document.getElementById("search-btn");
let getRecipeEl = document.getElementsByClassName("Recipebtn");
let displayInstructionsEl = document.getElementById("displayInstructions");

// Global variables
let foodItem = '';
let instructionStr = '';

function getSearchValue(event)
{
    //foodItem = event.target.textContent;
    foodItem = searchContentEl[0].value;
    console.log(foodItem)

    // want to clear
    clearFoodItems(event)
    getAPI(foodItem);
}
searchButtonEl.addEventListener("click", getSearchValue);


function getAPI(foodSearch)
{
    console.log("getAPI method")

    requestURL = 'https://themealdb.com/api/json/v1/1/search.php?s='+`${foodSearch}`;
    console.log('search in getAPI method', foodSearch);
    fetch(requestURL)
        .then(function(response){
            if(response.status == 200)
            {
                console.log('Good response', response.status)
            }else if(response.status >= 400)
            {
                console.log("Error, you receive a: " + response.status + " code")
            }
            return response.json();
        })
        .then(function(data){
            instructionStr=data.meals[1].strInstructions;
            getRecipe(instructionStr);
            //console.log(data.meals[1].strInstructions);
        })
}

function getRecipe(instructions)
{
    console.log("Instructions from getRecipe method")
    console.log(instructions);
    //getRecipeEl.createElement('p');
    //getRecipeEl.textElement = instructions
    displayInstructionsEl.append(instructions)
}

//getRecipeEl.addEventListener("click",getRecipe);




function clearFoodItems(event)
{
    searchContentEl[0].value.innerHTML='';
}
