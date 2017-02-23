Meteor.methods({

    deleteUser: function(userId) {

        console.log('Deleting user');

        Meteor.users.remove(userId);

    },

    setPaypalEmail: function(paypalEmail) {

        Meteor.users.update(Meteor.user()._id, { $set: { paypalEmail: paypalEmail } });

        console.log(Meteor.user())

    },
    insertSale: function(sale) {

        sale.date = new Date();
        var saleId = Sales.insert(sale);

        return Sales.findOne(saleId);

    },
    validateApiKey: function(key) {

        var adminUser = Meteor.users.findOne({ apiKey: { $exists: true } });

        if (adminUser.apiKey == key) {
            return true;
        } else {
            return false;
        }

    },

    getAllProducts: function() {

        // Get all PurePress integrations
        var integrations = Integrations.find({ type: 'purepress' }).fetch();

        var allProducts = [];

        for (i in integrations) {

            var products = Meteor.call('getProducts', integrations[i]);

            allProducts = allProducts.concat(products);

        }

        return allProducts;

    },

    getProducts: function(integration) {

        // Get products
        var url = "https://" + integration.url + "/api/products?key=" + integration.key;
        var answer = HTTP.get(url);
        var products = answer.data.products;
        console.log(products);
        return products;

    },
    getAllEarnings: function(affiliateCode) {

        // Get all PurePress integrations
        var integrations = Integrations.find({ type: 'purecart' }).fetch();

        var allEarnings = 0;

        for (i in integrations) {

            var earnings = Meteor.call('getEarnings', integrations[i], affiliateCode);

            allEarnings += earnings;

        }

        return allEarnings;

    },

    getEarnings: function(integration, affiliateCode) {

        // Get products
        var url = "https://" + integration.url + "/api/earnings?key=" + integration.key;
        url += '&ref=' + affiliateCode;
        console.log(url);

        var answer = HTTP.get(url);
        var earnings = answer.data.earnings;
        console.log(earnings);
        return earnings;

    },
    getAllSales: function() {

        // Get all PurePress integrations
        var integrations = Integrations.find({ type: 'purecart' }).fetch();

        var allSales = [];

        for (i in integrations) {

            var sales = Meteor.call('getSales', integrations[i]);

            allSales = allSales.concat(sales);

        }

        console.log(allSales)
        return allSales;


    },

    getSales: function(integration) {

        // Get products
        var url = "https://" + integration.url + "/api/sales?key=" + integration.key;
        url += '&ref=' + Meteor.user().affiliateCode;

        var answer = HTTP.get(url);
        var sales = answer.data.sales;
        return sales;

    },
    generateCode: function() {

        if (!Meteor.user().affiliateCode) {

            // Generate code
            var code = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 8; i++) {
                code += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { affiliateCode: code } });

        }

    },
    generateApiKey: function() {

        // Check if key exist
        if (!Meteor.user().apiKey) {

            // Generate key
            var key = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 16; i++) {
                key += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log(key);

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { apiKey: key } });
        }

    },
    addIntegration: function(data) {

        // Check if it doesn't exist
        if (Integrations.findOne({ url: data.url })) {

            // Update
            Integrations.update({ url: data.url }, data);

            // Return ID
            return Integrations.findOne({ url: data.url })._id;

        } else {

            // Insert
            var integrationId = Integrations.insert(data);
            return integrationId;

        }

    },
    removeIntegration: function(data) {

        // Insert
        Integrations.remove(data);

    },
    getIntegrations: function() {

        return Integrations.find({}).fetch();

    }

});
