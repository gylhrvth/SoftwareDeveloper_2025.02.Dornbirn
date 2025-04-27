


async function fetchPokemon(){
    const inputValue = document.getElementById("pokeInput").value;
    console.log(`Fetching data for: ${inputValue}`);
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;

    try {
        const response = await fetch(apiURL);

        if(!response.ok){
            throw new Error(`Pokémon not found: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data);

        showSprite(data);
        showName(data);
        showType(data);

    } catch (error){
        console.error('Error fetching Pokémon', error)
        alert('Failed to fetch Pokémon');
    }
}

function showSprite(data){
    const spriteURL = data.sprites.front_default;
    const spriteContainer = document.createElement('img');
    spriteContainer.classList.add('spriteClass');
    spriteContainer.src = `${spriteURL}`;
    spriteContainer.alt = `${data.name}`;

    // Append the sprite to the result container
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = "";
    resultContainer.appendChild(spriteContainer);
}

function showName(data){
    const nameURL = data.name;
    const nameElement = document.createElement('p');

    nameElement.classList.add('infoClass');
    nameElement.innerText = `Name: ${nameURL.charAt(0).toUpperCase() + nameURL.slice(1)}`;
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.appendChild(nameElement);

}


function showType(data) {
    // Extract all type names from the data
    //data.types is one array with objects inside. // Inside the object type, there is another oject with name, url)
    const types = data.types.map(typeInfo => typeInfo.type.name); // Ensure this is an array of strings

    // Create a paragraph element to display the types
    const typeElement = document.createElement('p');
    typeElement.classList.add('infoClass');

    // Capitalize the first letter of each type and join them with commas
    typeElement.innerText = `Type: ${types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}`;

    // Retrieve the result container and append the type element
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.appendChild(typeElement);
}











