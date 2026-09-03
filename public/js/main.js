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
                preptime:preptime.value,
                cooktime:cooktime.value,
                ingredients:ingredients.value,
                steps:steps.value
              },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'new recipe:', json )
}

window.onload = function() {

  const button = document.querySelector('button')
  button.onclick = submit
}
