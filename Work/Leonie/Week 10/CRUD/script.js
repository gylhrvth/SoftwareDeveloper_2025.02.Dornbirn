addEventListener('DOMContentLoaded', () => {
    getData()
})


async function getData() {
    const result = await fetch('http://85.215.164.164:3000/items/')
    const data = await result.json()
    if (result.ok) {
        console.log(data)
        createDOM(data)
    } else {
        alert("Error: " + result.status + " " + result.statusText);
        return null
    }
}

function createDOM(data) {
    const container = document.querySelector('.content');
    container.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');

        const aLink = document.createElement('a');
        aLink.href = `./details.html?id=${item.id}`;
        aLink.textContent = item.name;

        // Event Listener für den Link
        aLink.addEventListener('click', (event) => {
            event.preventDefault(); // Verhindert das Standardverhalten des Links
            console.log(`Link clicked for item: ${item.name}`);
            
            // Hier kannst du weitere Aktionen ausführen
        });

        const button = document.createElement('button');
        button.textContent = 'Delete';

        container.appendChild(div);
        div.appendChild(aLink);
        div.appendChild(button);
    });
}

