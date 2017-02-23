Template.settings.events({

    'click #generate-code': function() {

        Meteor.call('generateCode');

    },
    'click #set-paypal': function() {

        Meteor.call('setPaypalEmail', $('#paypal-email').val());

    }

});

Template.settings.helpers({

    affiliateCode: function() {
        return Meteor.user().affiliateCode;
    },
    email: function() {
        return Meteor.user().paypalEmail;
    }

});
