async function fetchJoke(){
    let response = await fetch('https://sv443.net/jokeapi/v2/joke/Programming?type=twopart')
    if (response.ok){
        let data = await response.json()
        displayJoke(data)
    }else{
        displayError()
    }
}

function displayJoke(joke){
    let jokeElement = document.getElementById('joke-container')
    let setup = joke.setup
    let delivery = joke.delivery

    jokeElement.innerHTML = '' // Clear previous joke
    let errorElement = document.getElementById('error-message')
    errorElement.innerHTML = '' // Clear previous error message

    const jokeSetup = document.createElement('p')
    jokeSetup.textContent = setup

    const jokeDelivery = document.createElement('p')
    jokeDelivery.textContent = delivery

    jokeElement.appendChild(jokeSetup)
    jokeElement.appendChild(jokeDelivery)
}

function displayError(){
    let errorElement = document.getElementById('error-message')
    errorElement.innerHTML = '' // Clear previous error message
    const errorMessage = document.createElement('p')
    errorMessage.textContent = 'Error fetching joke. Please try again later.'
    errorElement.appendChild(errorMessage)
}