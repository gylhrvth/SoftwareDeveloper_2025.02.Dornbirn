async function fetchNextJoke(){
    let result = await fetch('https://sv443.net/jokeapi/v2/joke/Programming?type=twopart')
    if (result.ok) {
        let content = await result.json()
        showJoke(content)

        
    } else {
        console.log('Server is not ready to deliver a new joke')
    }
}

function showJoke(joke){
    const jokeElement = document.getElementById('joke')

    const pSetup = document.createElement('p')
    pSetup.classList.add('setup')
    pSetup.textContent = joke.setup

    const pDelivery = document.createElement('p')
    pDelivery.classList.add('delivery')
    pDelivery.textContent = joke.delivery

    jokeElement.innerHTML = '';
    jokeElement.appendChild(pSetup)
     // Delay showing the delivery by 0.8 seconds
    setTimeout(() => {
        jokeElement.appendChild(pDelivery);
    }, 800);
}