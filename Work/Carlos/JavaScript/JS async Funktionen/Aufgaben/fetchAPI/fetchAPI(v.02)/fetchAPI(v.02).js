

async function fetchNextRandomPerson(){
    let result = await fetch('https://randomuser.me/api/')
    if (result.ok) {
        let content = await result.json()
        showRandomPerson(content.results[0]);
    } else {
        console.log('Server is not ready to deliver a new Random Person')
    }
}

function showRandomPerson(randomPerson){
    const randomPersonElement = document.getElementById('randomPerson')

    const pName = document.createElement('p');
    pName.classList.add('name');
    pName.textContent = `Name: ${randomPerson.name.title} ${randomPerson.name.first} ${randomPerson.name.last}`;

    const pLocation = document.createElement('p');
    pLocation.classList.add('info');
    pLocation.textContent = `Location: ${randomPerson.location.city}, ${randomPerson.location.state}, ${randomPerson.location.country}`;

    const pPicture = document.createElement('img');
    pPicture.classList.add('picture');
    pPicture.src = randomPerson.picture.large;
    pPicture.alt = `Picture of ${randomPerson.name.first} ${randomPerson.name.last}`;

    randomPersonElement.innerHTML = '';
    randomPersonElement.appendChild(pName);
    randomPersonElement.appendChild(pLocation);
    randomPersonElement.appendChild(pPicture);
}

console.log(randomPerson);