var product = require('../controllers/product');

module.exports = {

    configure: function(app){
        app.route('/api/product').post(product.create);
    }

};