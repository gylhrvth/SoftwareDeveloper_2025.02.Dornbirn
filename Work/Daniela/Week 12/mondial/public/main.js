/*document.addEventListener('DOMContentLoaded', function () {
    console.log('Document fully loaded and parsed');
    loadData()
});

async function loadData() {
    let result = await fetch('/api/country')
    if (result.ok) {
        let data = await result.json()
        console.log("loadData", data)
        renderCountry(data)
    }
};

function renderCountry(data) {
    let countryListE = document.getElementById('countryList')
    countryListE.innerHTML = ''
    data.forEach(row => {
        // h2 mit Ländernamen
        let h2E = document.createElement('h2')
        h2E.innerText = row.Name
        // p mit Capital 
        let pE = document.createElement('p')
        pE.innerText = 'Capital:' + row.Capital

        countryListE.appendChild(h2E)
        countryListE.appendChild(pE)
    });
};*/


//--------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
// /api/my_country 

document.addEventListener('DOMContentLoaded', function () {
    console.log('Document fully loaded');
    loadMyCountry()
    loadAllCountry()
    loadVorarlbergRivers()
    loadVorarlbergLake()
    loadbigestCity()
});

async function loadMyCountry(data) {
    let result = await fetch('/api/my_country')
    if (result.ok) {
        let data = await result.json()
        console.log("loadData", data)
        renderMyCountry(data)
    }
}

function renderMyCountry(data) {
    let myList = document.getElementById('myCountry')
    myList.innerHTML = ''
    data.forEach(row => {

        let C_div = document.createElement('div')
        C_div.innerText = row.name

        myList.appendChild(C_div)
    })
}

//------------------------------------------------------------------------
// all Country 
async function loadAllCountry(data) {
    let result = await fetch('/api/all_country')
    if (result.ok) {
        let data = await result.json()
        console.log("loadData", data)
        renderAllCountry(data)
    }
}

function renderAllCountry(data) {
    let myList = document.getElementById('allCountry')
    myList.innerHTML = ''
    data.forEach(row => {

        let C_div = document.createElement('div')
        C_div.innerText = row.name

        myList.appendChild(C_div)
    })
}

//-----------------------------------------------------------------

async function loadVorarlbergRivers(data) {
    let result = await fetch('/api/Vorarlberg_rivers')
    if (result.ok) {
        let data = await result.json()
        console.log("loadData", data)
        renderVorarlbergRivers(data)
    }
}


function renderVorarlbergRivers(data) {
    let myList = document.getElementById('VorarlbergRivers')
    myList.innerHTML = ''
    data.forEach(row => {

        let C_div = document.createElement('div')
        C_div.innerText = row.Name

        myList.appendChild(C_div)
    })
}

//------------------------------------------------------------------------
async function loadVorarlbergLake(data) {
    let result = await fetch('/api/Vorarlberg_Lake')
    if (result.ok) {
        let data = await result.json()
        console.log("loadData", data)
        renderVorarlbergLake(data)
    }
}


function renderVorarlbergLake(data) {
    let myList = document.getElementById('VorarlbergLake')
    myList.innerHTML = ''
    data.forEach(row => {

        let C_div = document.createElement('div')
        C_div.innerText = row.name

        myList.appendChild(C_div)
    })
}
//--------------------------------------------------------------------------
async function loadbigestCity(data) {
    let result = await fetch('/api/bigesCity')
    if (result.ok) {
        let data = await result.json()
        console.log("loadData", data)
        renderbigestCity(data)
    }
}


function renderbigestCity(data) {
    let myList = document.getElementById('bigestCity')
    myList.innerHTML = ''
    data.forEach(row => {

        let C_div = document.createElement('div')
        C_div.innerText = `${row.Continent} 
        Einwohner (Ø): ${row.AvgPopulation.toLocaleString() }\n`
        myList.appendChild(C_div)
    })
}

//--------------------------------------------------------------------------------


