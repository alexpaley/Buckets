BucketListView = Backbone.View.extend({

  className: 'sidebar nav nav-list',

  initialize: function() {
    // this.model      = new Bucket();
    this.collection = new BucketList();
    // this.formView   = new FormView({model: this.model, collection: this.collection});
    // this.renderForm();
    this.collection.on("add", this.appendBucket, this);
    this.collection.on("edit", function(model) {
      console.log(this.model, model);
      this.renderForm(model);
    }, this);
  },

  template: _.template("<li class='nav-header header-font'>Your Buckets</li>" +
                        "<a class='btn plus' href='#''><i class='icon-plus'></i></a>"),

  events: {
    'click .btn.plus': function(e) {
      this.renderForm();
    },

    'click .bucket': 'highlightBucket'
  },

  appendBucket: function() {
    var last_bucket = this.collection.at(this.collection.length - 1);
    return this.$el.append(new BucketView({model: last_bucket}).render());
  },

  renderForm: function(model) {
    $('.sidebar').toggleClass('inputting');
    this.$('.btn.plus').after((new FormView({model: model, collection: this.collection})).render());
  },

  highlightBucket: function(event) {
    var $target = $(event.target);
    $target.parent().toggleClass('active');
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(this.template());
  }
});
