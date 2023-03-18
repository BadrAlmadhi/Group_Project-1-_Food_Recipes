let searchInputEl = document.getElementById("search-input");
let searchContentEl = document.getElementsByClassName("search-content");
let searchButtonEl = document.getElementById("search-btn");
let getRecipeEl = document.getElementById("Recipebtn");
let displayInstructionsEl = document.getElementById("displayInstructions");
let instructionsListEl = document.getElementById("instructionsList");
let showImageEl = document.getElementById("imageLink");
let showImageEl2 = document.getElementById("meal-photo");
let playVideoEl = document.getElementById("player");
let clearbtnEl = document.getElementById("clear-btn");

// Global variables
let foodItem = '';
let instructionStr = '';
let siteImage = '';
let youtubeVideo = '';
let link = '';
let lengthOfItems = 0;
let lowest = 0;

let storingInstructions = '';
let foodObj = JSON.parse(localStorage.getItem("ingredientsInfo"))||[];
let imageArr = JSON.parse(localStorage.getItem("ImageInfo"))||[];
let setBooleanValueArr = JSON.parse(localStorage.getItem("boolValInfo"))||[];
//let foodObj = [];
let instructionP = '';

 let changeImageValue = false;



siteDefaultImage();
showLastInstruction();


// clearbtnEl.addEventListener("click", function(){
//     localStorage.clear();
//     instructionsListEl.innerHTML='';

// });



// getting the food item to search for
function getSearchValue(event)
{
    
    foodItem = searchContentEl[0].value;
    console.log(foodItem)

    // want to clear
    clearFoodItems(event)
    getAPI(foodItem);
}
searchButtonEl.addEventListener("click", getSearchValue);

// using the meal api to get instruction to make meal
function getAPI(foodSearch)
{
    console.log("getAPI method")

    requestURL = 'https://themealdb.com/api/json/v1/1/search.php?s='+`${foodSearch}`;
    console.log('search in getAPI method', foodSearch);
    fetch(requestURL)
        .then(function(response){
            if(response.status == 200) // checking for response
            {
                console.log('Good response', response.status)
            }else if(response.status >= 400)
            {
                console.log("Error, you receive a: " + response.status + " code")
            }
            return response.json();
        })
        .then(function(data){
            instructionStr=data.meals[0].strInstructions;
            siteImage = data.meals[0].strMealThumb;
           // youtubeVideo = data.meals[0].strYoutube;
            console.log("site Image:", siteImage);
            // instructionStr=data.meals[0].strInstructions;
           // getRecipe(instructionStr);
           instructionsListEl.innerHTML='';
            changeImage(siteImage);
            getYoutubeAPI();
           // changeImageValue = true;
            
        //     foodObj = [
        //         instructionStr
        //    ];
        ingredientsInfo = {
            foodIntr: instructionStr
        }
        ImageInfo = {
            imagePic: siteImage
        }

        boolValInfo = {
            val: changeImageValue
        }
       
       foodObj.push(ingredientsInfo);
       localStorage.setItem("ingredientsInfo", JSON.stringify(foodObj))

       imageArr.push(ImageInfo);
       localStorage.setItem("ImageInfo", JSON.stringify(imageArr));

        setBooleanValueArr.push(boolValInfo);
        localStorage.setItem("boolValInfo", JSON.stringify(setBooleanValueArr));
            
        });
}

// getting the recipe
function getRecipe()
{

    // splits instructions into individual paragraphs
    let instructionsSplit = instructionStr.split('\n');// instructions.split('\n');
   
    for (let i = 0; i < instructionsSplit.length; i++) {
        instructionP = document.createElement('p');
        instructionP.textContent = instructionsSplit[i];
        displayInstructionsEl.appendChild(instructionP);
        console.log('print something');
    }
}


function showLastInstruction()
{
    if(foodObj.length)
    {
        let lastInstruction = foodObj[foodObj.length-1].foodIntr;
        let instructionsSplit = lastInstruction.split('\n');
        for(let i = 0; i < instructionsSplit.length;i++)
        {
            let instructionP2 = document.createElement('p');
            instructionP2.textContent = instructionsSplit[i];
            instructionsListEl.appendChild(instructionP2);
            //displayInstructionsEl.appendChild(instructionP2);
        }
        

    }

    if(imageArr.length){
        let lastImage = imageArr[imageArr.length-1].imagePic
        changeImage(lastImage)
    }
    // find whats in local storage and display
}

getRecipeEl.addEventListener("click", getRecipe);

function changeImage(imgSource)
{
    showImageEl.removeAttribute("img");
    showImageEl.setAttribute("src", imgSource);
   // youtubeVideo.setAttribute("src", youtubeVideo);
    
    
}

function siteDefaultImage()
{
    showImageEl.setAttribute("src", "./assets/food.fries.jpg");
}



function siteDefaultImage()
{
    showImageEl.setAttribute("src", "./assets/food.fries.jpg");
    
}


function clearFoodItems(event)
{
    searchContentEl[0].value.innerHTML='';
}

clearbtnEl.addEventListener("click", function(){
    localStorage.clear();
    instructionsListEl.innerHTML='';

});

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
            console.log("Length of the youtube api data",data.items.length);
            //console.log(data.refinements[0].url);
            console.log(data.items[0].url);
            youtubeVideo = data.items[randomValue()].url;
            lengthOfItems = data.items.length;
           // console.log("Random Value",randomValue());
           setYoutubeLink();
        });

        //playVideoEl
        
}

function setYoutubeLink()
{
    console.log("set youtube link");
    playVideoEl.setAttribute("href", youtubeVideo);
}

function randomValue()
{
    return Math.floor(Math.random() * (lengthOfItems - lowest));
}
