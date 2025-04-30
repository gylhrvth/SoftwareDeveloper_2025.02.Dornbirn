
document.addEventListener("DOMContentLoaded", () => {
    const server = `http://85.215.164.164:3000/items/`;

    const button = document.getElementById("getData");
    button.addEventListener("click", getData);

    const loadButton = document.getElementById("loadButton");
    loadButton.addEventListener("click", listAll);

    async function getData() {
        const result = await fetch(server);
        const data = await result.json();
        if (result.ok) {
            console.log(data)
        } else {
            alert("Error: " + result.status + " " + result.statusText);
            return null;
        }
    }

    async function listAll() {
        console.log('listAll() wurde aufgerufen');

        try {
            let result = await fetch(server + "/objects");
            console.log("HTTP Status:", result.status);

            if (!result.ok) {
                console.error('listAll(): Fetch ist schiefgegangen ...');
                return;
            }

            let data = await result.json();
            console.log(data);
        } catch (err) {
            console.error("Fetch-Fehler:", err);
        }
    }
});
