BucketListView = Backbone.View.extend({

  className: 'sidebar nav nav-list',

  initialize: function() {
    this.model      = new Bucket();
    this.collection = new BucketList();
    this.formView   = new FormView({model: this.model, collection: this.collection});

    this.collection.on("add", this.appendBucket, this);
    this.collection.on("edit", function() {
      this.renderForm();
      $('.btn.save').replaceWith("<button type='edit' class='btn edit'>edit</button>");
    }, this);
  },

  template: _.template("<li class='nav-header header-font'>Your Buckets</li>" +
                        "<a class='btn plus' href='#''><i class='icon-plus'></i></a>"),

  events: {
    'click .btn.plus': 'renderForm',

    'click .bucket': 'highlightBucket'
  },

  appendBucket: function() {
    var last_bucket = this.collection.at(this.collection.length - 1);
    return this.$el.append(new BucketView({model: last_bucket}).render());
  },

  renderForm: function() {
    $('.sidebar').toggleClass('inputting');
    this.$('.btn.plus').after(this.formView.render());
    // console.log(this.formView, this.model, this.collection);
  },

  highlightBucket: function(event) {
    var $target = $(event.target);
    $target.parent().toggleClass('active');
  },

  render: function() {
    console.log('In this BucketListView render function');
    this.$el.children().detach();
    return this.$el.html(this.template());
  }
});
