Meteor.methods({

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

    }

});
