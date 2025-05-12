
async function loadAPI_Data(){
    let result = await fetch('/API/city')
    if (result.ok){
        let data = await result.json()
        console.log(data)
        renderCityList(data)
    } else {
        console.error('Cannot load /API/city')
    }
}

function renderCityList(data){
    document.getElementById('cityContainer').innerHTML = ''
    data.forEach(cityData => {
        renderCity(cityData)
    });
    renderNewCity()
}

function renderCity(cityData){
    let containerE = document.getElementById('cityContainer')
    let cityDivE = document.createElement('div')
    cityDivE.classList.add('city')

    let dataDivE = document.createElement('div')
    dataDivE.classList.add('data')

    let h3E = document.createElement('h3')
    h3E.textContent = cityData.Name
    dataDivE.appendChild(h3E)

    let divPopulationE = document.createElement('div')
    divPopulationE.textContent = cityData.Population == null ? 'n.n' : cityData.Population.toLocaleString('de-AT')
    dataDivE.appendChild(divPopulationE)
    cityDivE.append(dataDivE)

    let formE = document.createElement('form')
    formE.classList.add('cityDELETE')
    formE.attributes.action = '#'

    let buttonE = document.createElement('button')
    buttonE.textContent = '🗑️'
    buttonE.addEventListener('click', event => deleteCity(event, cityData.Name))
    formE.appendChild(buttonE)

    cityDivE.appendChild(formE)
    containerE.appendChild(cityDivE)
}

function renderNewCity(){
    let containerE = document.getElementById('cityContainer')
    let cityDivE = document.createElement('div')
    cityDivE.classList.add('city')

    let dataDivE = document.createElement('div')
    dataDivE.classList.add('data')

    let h3E = document.createElement('h3')
    h3E.textContent = 'Add new city'
    dataDivE.appendChild(h3E)

    let formE = document.createElement('form')
    formE.classList.add('cityCREATE')
    formE.attributes.action = '#'

    let inputE = document.createElement('input')
    inputE.attributes.type = 'text'
    inputE.id = 'newCityName'
    inputE.placeholder = 'city name'
    inputE.attributes.value = ''
    inputE.addEventListener('keyup', event => checkNewCityName(event))
    formE.appendChild(inputE)

    let spanE = document.createElement('span')
    let buttonE = document.createElement('button')
    buttonE.id = 'addNewCityButton'
    buttonE.disabled = true;
    buttonE.textContent = '⊕'
    buttonE.addEventListener('click', event => createNewCity(event))
    spanE.appendChild(buttonE)
    formE.appendChild(spanE)

    dataDivE.appendChild(formE)
    cityDivE.appendChild(dataDivE)
    containerE.appendChild(cityDivE)
}


function checkNewCityName(e){
    document.getElementById('addNewCityButton').disabled = (e.target.value.length === 0)
}

async function deleteCity(e, cityName){
    e.preventDefault(); // prevent FORM submit
    result = await fetch('/API/city', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: cityName })
    })
    if (result.ok){
        loadAPI_Data()
    }
}

async function createNewCity(e){
    e.preventDefault(); // prevent FORM submit
    const cityName = document.getElementById('newCityName').value
    result = await fetch('/API/city', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Name: cityName })
    })
    if (result.ok){
        loadAPI_Data()
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML fully loaded and parsed');
    loadAPI_Data()
});
