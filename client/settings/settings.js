Template.settings.events({

  'click #generate-code': function () {

    Meteor.call('generateCode');

  }

});

Template.settings.helpers({

  affiliateCode: function() {
    return Meteor.user().affiliateCode;
  }

});

