// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  const name = document.querySelector( '#recipename' ),
        preptime = document.querySelector( '#preptime' ),
        cooktime = document.querySelector( '#cooktime' ),
        ingredients = document.querySelector( '#ingredients' ),
        steps = document.querySelector( '#steps' ),
        json = {name: name.value,
                preptime:preptime.valueAsNumber,
                cooktime:cooktime.valueAsNumber,
                ingredients:ingredients.value,
                steps:steps.value
              },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const returnedtext = await response.text()
  // console.log( 'response:', returnedtext )

  newRecipe = JSON.parse( returnedtext )
  console.log( 'new recipe', newRecipe )
  console.log(`Recipe recieved: ${ newRecipe.name } ${ newRecipe.ingredients }`)

  const recipeList = document.getElementById('recipe-list')

  // Create recipe card
  const newRecipeCard = document.createElement('article')
  newRecipeCard.classList.add('recipe-card')
  newRecipeCard.classList.add('border')

  // Add title to recipe card
  const newTitle = document.createElement('h3')
  let text = document.createTextNode(`${newRecipe.name}`)
  newTitle.appendChild(text)
  newRecipeCard.appendChild(newTitle)

  // Add time info to recipe card
  const newTimeInfo = document.createElement('time-info')
  {
    // Add total time
    let newTime = document.createElement('time-item');
    let text = document.createTextNode('Total time');
    newTime.appendChild(text);
    let span = document.createElement('span');
    text = document.createTextNode(`${newRecipe.totaltime} minutes`);
    span.appendChild(text);
    newTime.appendChild(span);
    newTimeInfo.appendChild(newTime);

    // Add prep time
    newTime = document.createElement('time-item');
    text = document.createTextNode('Prep time');
    newTime.appendChild(text);
    span = document.createElement('span');
    text = document.createTextNode(`${newRecipe.preptime} minutes`);
    span.appendChild(text);
    newTime.appendChild(span);
    newTimeInfo.appendChild(newTime);
    
    // Add cook time
    newTime = document.createElement('time-item');
    text = document.createTextNode('Cook time');
    newTime.appendChild(text);
    span = document.createElement('span');
    text = document.createTextNode(`${newRecipe.cooktime} minutes`);
    span.appendChild(text);
    newTime.appendChild(span);
    newTimeInfo.appendChild(newTime);
  }
  newRecipeCard.appendChild(newTimeInfo);
  
  // Add ingredients
  const newIngredients = document.createElement('ingredient-card');
  newIngredients.classList.add('border');
  text = document.createTextNode(`${newRecipe.ingredients}`);
  newIngredients.appendChild(text);
  newRecipeCard.appendChild(newIngredients);

  // Add steps
  const newSteps = document.createElement('step-card');
  newSteps.classList.add('border');
  text = document.createTextNode(`${newRecipe.steps}`);
  newSteps.appendChild(text);
  newRecipeCard.appendChild(newSteps);

  recipeList.appendChild(newRecipeCard)
}

window.onload = function() {
  const createform = document.querySelector('#create-recipe')
  createform.onsubmit = submit
}
