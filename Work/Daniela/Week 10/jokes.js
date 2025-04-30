

async function fetchNextJoke(){
    let result = await fetch('https://official-joke-api.appspot.com/jokes/random')
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
    pDelivery.textContent = joke.punchline

    jokeElement.innerHTML = ''
    jokeElement.appendChild(pSetup)
    jokeElement.appendChild(pDelivery)
}

//Memes

async function fetchMeme() {
    const apiKey = 'DEIN_API_KEY'; // <--- hier deinen Key einsetzen
    const url = `https://api.humorapi.com/memes/random?keywords=rocket&api-key=${apiKey}`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Fehler beim Laden des Memes");

        let meme = await response.json();
        showMeme(meme);
    } catch (error) {
        console.error("Meme konnte nicht geladen werden:", error);
    }
}

function showMeme(meme) {
    const memeSection = document.getElementById('meme');
    memeSection.innerHTML = ''; // vorherigen Inhalt leeren

    const img = document.createElement('img');
    img.src = meme.url;
    img.alt = 'Random Meme';
    img.style.maxWidth = '60%';

    memeSection.appendChild(img);
}
