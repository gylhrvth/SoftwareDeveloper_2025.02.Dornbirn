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
