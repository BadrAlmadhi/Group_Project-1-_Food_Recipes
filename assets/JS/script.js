let searchInputEl = document.getElementById("search-input");
let searchContentEl = document.getElementsByClassName("search-content");
let searchButtonEl = document.getElementById("search-btn");
let getRecipeEl = document.getElementsByClassName("Recipebtn");
let displayInstructionsEl = document.getElementById("displayInstructions");
let showImageEl = document.getElementById("imageLink");
let showImageEl2 = document.getElementById("meal-photo");
let playVideoEl = document.getElementById("player");

//let youtubeTag = document


//document.querySelector

// Global variables
let foodItem = '';
let instructionStr = '';
let siteImage = '';
let youtubeVideo = '';
let link = '';

siteDefaultImage();

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
            siteImage = data.meals[0].strMealThumb;
            youtubeVideo = data.meals[0].strYoutube;
            console.log("site Image:", siteImage);
            getRecipe(instructionStr);
            changeImage();
            getYoutubeAPI();
            //console.log(data.meals[1].strInstructions);
        })
}

function getRecipe(instructions)
{
    // splits instructions into individual paragraphs
    let instructionsSplit = instructions.split('\n');
    for (let i = 0; i < instructionsSplit.length; i++) {
        let instructionP = document.createElement('p');
        instructionP.textContent = instructionsSplit[i];
        displayInstructionsEl.appendChild(instructionP);
    }
}



function changeImage(event)
{
    showImageEl.removeAttribute("img");
    showImageEl.setAttribute("src", siteImage);
   // youtubeVideo.setAttribute("src", youtubeVideo);
    
    
}

function siteDefaultImage()
{
    showImageEl.setAttribute("src", "/assets/food.fries.jpg");
    
}


function clearFoodItems(event)
{
    searchContentEl[0].value.innerHTML='';
}

function getYoutubeAPI()
{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '446d3c29a7mshbfe229d3afccb08p186bfbjsn9a2b442a5050',
            'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
        }
    };
    
    fetch('https://youtube-search-results.p.rapidapi.com/youtube-search/?q='+`${foodItem}`, options)
        .then(function(response){
            if(response.status == 200)
            {
                console.log('Good Youtube response', response.status)
            }else if(response.status >= 400)
            {
                console.log("Error, your youtube receive a: " + response.status + " code")
            }
            return response.json();
        })
        .then(function (data){
            console.log(data.refinements.length);
            //console.log(data.refinements[0].url);
            console.log(data.items[0].url);
            //youtubeVideo = data.
        });
        
}
