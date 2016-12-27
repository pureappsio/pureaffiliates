Router.configure({
  layoutTemplate: 'layout'
});

// Routes
Router.route('/dashboard', {name: 'dashboard'});
Router.route('/settings', {name: 'settings'});
Router.route('/sales', {name: 'sales'});
Router.route('/admin', {name: 'admin'});
Router.route('/', {name: 'home', data: function() { this.render('dashboard') }});

