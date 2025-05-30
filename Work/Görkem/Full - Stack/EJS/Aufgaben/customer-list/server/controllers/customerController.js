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
