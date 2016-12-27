Template.admin.events({

    'click #generate-key': function() {

        Meteor.call('generateApiKey');

    }

});

Template.admin.helpers({

    key: function() {
        return Meteor.user().apiKey;
    }

});
