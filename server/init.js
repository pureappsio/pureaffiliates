Meteor.startup(function() {

    process.env.MAIL_URL = Meteor.settings.MAIL_URL;

    // Allow delete users
    Meteor.users.allow({
        remove: function() {
            return true;
        }
    });

});
