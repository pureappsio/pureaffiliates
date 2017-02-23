Template.sale.helpers({

    formatedAmount: function() {

        if (this.currency == 'EUR') {
            return parseFloat(this.amount) + ' €'
        } else {
            return '$' + parseFloat(this.amount);
        }

    },
    commission: function() {
         if (this.currency == 'EUR') {
            return parseFloat(this.amount)/2 + ' €'
        } else {
            return '$' + parseFloat(this.amount)/2;
        }
    },
    formatedDate: function() {
        return moment(this.date).format('MMMM Do YYYY, h:mm:ss a');
    }

});
