
function f() {
    fetch('https://sv443.net/jokeapi/v2/joke/Programming')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
        )
        .then(data => {
            console.log(data);
        }
        )
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', errorrrrrrrrr);
        });
}
f();    