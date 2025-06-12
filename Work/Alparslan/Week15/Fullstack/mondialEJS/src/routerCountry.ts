import { Express } from 'express';
import { dbCountryDetails, dbCountryList, dbCountrySave } from './db';

const initRouteCountry = (app: Express) => {
    // Initialize your country-related routes here
app.get('/country', async (_req, res) => {
    dbCountryList()
        .then(countries => {
            //console.log('Country list fetched successfully:', countries);
            res.render('country/index', { countries });
        })
        .catch(err => {
            console.error('Error fetching country list:', err);
            res.status(500).send('Internal Server Error');
        });
})

app.get('/country/:code', async (req, res) => {
    const code = req.params.code;
    dbCountryDetails(code)
        .then(country => {
            //console.log('Country Details:', country);
            res.render('country/detail', { country });
        })
        .catch(err => {
            console.error('Error fetching country list:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/country/:code/edit', async (req, res) => {
    const code = req.params.code;
    dbCountryDetails(code)
        .then(country => {
            //console.log('Country Details:', country);
            res.render('country/edit', { country });
        })
        .catch(err => {
            console.error('Error fetching country list:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/country/:code/save', async (req, res) => {
    console.log('Save', req.body);
    dbCountrySave(req.body)
        .then(() => {
            //console.log('Update successful');
            res.redirect(`/country/${req.body.Code}`);
        })
        .catch(err => {
            console.error('Error updating country:', err);
            res.status(500).send('Internal Server Error');
        });    
})

};

export default initRouteCountry;