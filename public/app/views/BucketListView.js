BucketListView = Backbone.View.extend({

  className: 'sidebar nav nav-list',

  initialize: function() {
    this.collection = new BucketList({url:'/'});
    this.formView   = new FormView({model: new Bucket(), collection: this.collection});
    this.collection.on("add", this.appendBucket, this);
    this.collection.fetch();
  },

  template: _.template("<li class='nav-header header-font'>Your Buckets</li>" +
                        "<a class='btn plus' href='#''><i class='icon-plus'></i></a>"),

  events: {
    'click .btn.plus': function(e) {
      this.collection.addNew();
      this.renderForm();
    },

    'click .bucket': 'highlightBucket'
  },

  appendBucket: function(model) {
    console.log(this, arguments);
    return this.$el.append(new BucketView({model: model}).render());
  },

  renderForm: function(model) {
    $('.sidebar').toggleClass('inputting');
    this.$('.btn.plus').after(this.formView.render());
  },

  highlightBucket: function(event) {
    var $target = $(event.target);
    $target.parent().toggleClass('active');
  },

  grabSelectedEmails: function() {
    myDropZone.on("complete", function(file) {

    });
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(this.template());
  }
});
