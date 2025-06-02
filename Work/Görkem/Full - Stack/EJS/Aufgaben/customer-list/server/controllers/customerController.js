const Customer = require('../../models/Customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
    try {
        const data = await Customer.find({}).limit(22);
        const messages = req.flash('info');
        const locals = {
            title: 'Node.js',
            description: 'Free NodeJs User Managment System',
            data,
            messages
        };
        res.render('index', locals);
    } catch (err) {
        console.log('ERROR', err);
        res.status(500);
    }
};

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
        req.flash('info', 'Neuer Kunde wurde erfolgreich angelegt!');
        res.redirect('/');
    
    } catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Anlegen des Kunden.');
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        req.flash('info', 'Kunde wurde gelöscht!');
        res.redirect('/');
    } catch (err) {
        console.log('ERROR', err);
        res.status(500).send('Fehler beim Löschen des Kunden.');
    }
};
