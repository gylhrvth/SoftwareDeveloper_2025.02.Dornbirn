

function f(addr : string): number{
    fetch(addr)
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
            console.error('There has been a problem with your fetch operation:', error);
        });

        return 1;
}



for (let i = 0; i < 10; i++) {
    console.log("Hello World");
    console.log(i);
}


let result: number = f('https://sv443.net/jokeapi/v2/joke/Programming')


