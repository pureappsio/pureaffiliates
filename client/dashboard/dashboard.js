Template.dashboard.events({

});

Template.dashboard.onRendered(function() {

    Meteor.call('getAllEarnings', Meteor.user().affiliateCode, function(err, data) {

        Session.set('earnings', (data/2).toFixed(2) );

    });

});

Template.dashboard.helpers({

    earnings: function() {
        return Session.get('earnings');
    }

});
