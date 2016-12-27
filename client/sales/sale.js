Template.sale.helpers({

  commission: function() {
    return parseFloat(this.amount)/2
  },
  formatedDate: function() {
  	return moment(this.date).format('MMMM Do YYYY, h:mm:ss a');
  }

});