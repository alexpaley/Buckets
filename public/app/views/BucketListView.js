BucketListView = Backbone.View.extend({

  className: 'sidebar nav nav-list',

  initialize: function() {
    this.active = {};

    this.collection = new BucketList({url:'/'});
    this.formView   = new FormView({model: new Bucket(), collection: this.collection});
    this.collection.on("add", this.appendBucket, this);
    this.collection.fetch({context: this.collection}).done(function() {
      console.log(this.length);
      if(!this.length) {
        $('.btn.plus').tooltip({trigger: 'hover', animation: true, placement:'top',
            title: 'Your first bucket! Name and emails for your group please?'});
      }
    });
  },

  template: _.template("<li class='nav-header header-font'>Your Buckets</li>" +
                        "<a class='btn plus' href='#''><i class='icon-plus'></i></a>"),

  events: {
    'click .btn.plus': 'renderForm',

    'click .bucket': 'highlightBucket'
  },

  appendBucket: function(model) {
    $('.btn.plus').tooltip('destroy');
    return this.$el.append(new BucketView({model: model}).render());
  },

  renderForm: function(model) {
    $('.sidebar').toggleClass('inputting');
    this.$('.btn.plus').after(this.formView.render());
  },

  highlightBucket: function(event) {
    var $target = $(event.currentTarget);

    var id = $target.find('a').data('id');
    console.log(this.active[id]);
    if(this.active[id]) {
      delete this.active[id];
      $target.removeClass('active');
    }
    else {
      this.active[id] = true;
      $target.addClass('active');
    }
  },

  grabSelectedEmails: function() {
    var selected = this.active;
    var emailArray = [];

    this.collection.each(function(model) {
      if(selected[model.attributes._id]) {
        emailArray.push(model.attributes.emails);
      }
    });
    return emailArray;
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(this.template());
  }
});
