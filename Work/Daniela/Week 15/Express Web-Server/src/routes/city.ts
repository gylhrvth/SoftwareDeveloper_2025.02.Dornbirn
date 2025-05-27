import { Express, Request, Response } from "express";

type City = {
    id: number;
    name: string;
    population: number;
};

let cities: City[] = [
    { id: 1, name: "Berlin", population: 3700000 },
    { id: 2, name: "Hamburg", population: 1800000 },
    { id: 3, name: "München", population: 1500000 },
    { id: 4, name: "Köln", population: 1080000 },
    { id: 5, name: "Frankfurt am Main", population: 760000 },
    { id: 6, name: "Stuttgart", population: 630000 },
    { id: 7, name: "Düsseldorf", population: 620000 },
    { id: 8, name: "Dortmund", population: 590000 },
    { id: 9, name: "Essen", population: 580000 },
    { id: 10, name: "Leipzig", population: 600000 }
];

let nextId = 11;

const initCityRoutes = (app: Express) => {
    console.log("Hello World!")

    app.get('/city', (_req: Request, res: Response) => {
        console.log('get all cities')
        res.json(cities);
    })

    //Get einzelne Stadt 
    app.get('/city/:id', (req: Request, res: Response) => {

        const id = parseInt(req.params.id);
        const city = cities.find(city => city.id === id);

console.log('city', city)

        if (!city) {
            res.status(404).send("City not found");
            return
        }
        res.json(city);
    });

    //POST neue Stadt zufügen
    app.post('/city', (req: Request, res: Response) => {

        const { name, population } = req.body;
        const newCity: City = { id: nextId++, name, population };

        cities.push(newCity);
        res.status(201).json(newCity);
    });

    //PUT Stadt ersetzen 
    app.put('/city/:id', (req: Request, res: Response) => {

        const id = parseInt(req.params.id);
        const index = cities.findIndex(city => city.id === id);

        if (index === -1) {
            res.status(404).send("City not found");
            return
        }
        const { name, population } = req.body;
        cities[index] = { id, name, population };
        res.status(200).json(cities[index]);
    });

    // PATCH Stadt teilweise ändern
    app.patch('/city/:id', (req: Request, res: Response) => {

        const id = parseInt(req.params.id);
        const city = cities.find(city => city.id === id);

        if (!city) {
            res.status(404).send("City not found");
            return
        }

        const { name, population } = req.body;
        if (name !== undefined) city.name = name;
        if (population !== undefined) city.population = population;

        res.status(200).json(city);
    });


    //DELETE Stadt löschen
    app.delete('/city/:id', (req: Request, res: Response) => {

        const id = parseInt(req.params.id);
        const index = cities.findIndex(city => city.id === id);

        if (index === -1) {
            res.status(404).send("City not found");
            return
        }
        const deletedCity = cities.splice(index, 1)[0];
        res.status(200).json(deletedCity);

    });

};

export default initCityRoutes;


