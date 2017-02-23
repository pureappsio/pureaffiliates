Template.sales.helpers({

  sales: function() {
    return Session.get('allSales');
  }

});

Template.sales.onRendered(function() {

    Meteor.call('getAllSales', function(err, data) {

        Session.set('allSales', data);

    });

});