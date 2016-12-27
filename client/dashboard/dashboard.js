Template.dashboard.events({

  'click #generate-code': function () {

    Meteor.call('generateCode');

  }

});

Template.dashboard.helpers({

  earnings: function() {
  	var sales = Sales.find({affiliateCode: Meteor.user().affiliateCode}).fetch();
  	var earnings = 0;
  	for (i = 0; i < sales.length; i++) {

  		earnings += parseFloat(sales[i].amount)/2;

  	}
  	return earnings;
  }

});
