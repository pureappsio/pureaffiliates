Template.user.helpers({
    email: function() {
        return this.emails[0].address;
    },
    earnings: function() {
        return Session.get('userEarnings' + this._id);
    }

});

Template.user.events({
    'click .user-delete': function() {
        Meteor.call('deleteUser', this._id);
    }
});


Template.user.onRendered(function() {

    if (this.data) {

    	var userId = this.data._id;

        Meteor.call('getAllEarnings', this.data.affiliateCode, function(err, data) {

        	console.log(data);
            Session.set('userEarnings' + userId, (data / 2).toFixed(2));

        });
    }

});
