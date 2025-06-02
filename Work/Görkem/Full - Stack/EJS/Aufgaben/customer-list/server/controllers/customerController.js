const Customer = require('../../models/Customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
    const locals = {
        title: 'Node.js',
        description: 'Free NodeJs User Managment System'
    }
    res.render('index', locals);
}

/**
 * GET /customer/add
 * Formular für neuen Kunden anzeigen
 */
exports.addCustomer = (req, res) => {
    const locals = {
        title: 'Kunde hinzufügen',
        description: 'Neuen Kunden anlegen'
    }
    res.render('customer/add', locals);
};

/**
 * POST /customer/add
 * Formular für neuen Kunden anzeigen
 */
exports.postCustomer = async (req, res) => {
    // console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email
    });

    try {
        await Customer.create(newCustomer);
        res.redirect('/');
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Anlegen des Kunden.');
    }
};
