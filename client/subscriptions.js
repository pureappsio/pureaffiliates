// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userSales');
    Meteor.subscribe('allUsers');
});