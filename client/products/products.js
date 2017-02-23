Template.products.onRendered(function() {

    Meteor.call('getAllProducts', function(err, data) {


        // Add affiliate code
        if (Meteor.user().affiliateCode) {
            for (d in data) {
            	data[d].url = data[d].url + '?ref=' + Meteor.user().affiliateCode;
            }
        }

        Session.set('allProducts', data);

    });

});

Template.products.helpers({

    allProducts: function() {
        return Session.get('allProducts');
    }

});
