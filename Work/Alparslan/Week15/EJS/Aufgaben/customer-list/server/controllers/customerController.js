const Customer = require('../models/Customer');


/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });

        res.render('index', {
            title: 'Node.js',
            description: 'Free NodeJs User Managment System',
            customers
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Fehler beim Laden der Kunden');
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
 * Neuen Kunden erstellen
 */
exports.createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, tel, email, details } = req.body;

        const newCustomer = new Customer({
            firstName,
            lastName,
            tel,
            email,
            details
        });

        await newCustomer.save();

        res.redirect('/customer');
    } catch (error) {
        console.log(error);
        res.status(500).send('Serverfehler beim Erstellen des Kunden');
    }
};

