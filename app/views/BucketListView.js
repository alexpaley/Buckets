BucketListView = Backbone.View.extend({

  className: 'sidebar nav nav-list',

  initialize: function() {
    this.collection.on("add remove", this.render, this);
  },

  template: _.template("<li class='nav-header header-font'>Your Buckets</li>" +
                        "<a class='btn plus' href='#''><i class='icon-plus'></i></a>"),

  editTemplate: _.template("<form class='form-horizontal add-bucket'>" +
                            "<div class='control-group'>" +
                              "<input class='bucket-name' type='text' placeholder='bucket name'>" +
                              "<textarea class='bucket-email' type='text' placeholder='bucket emails'></textarea>" +
                              "<button type='save' class='btn save'>save</button>" +
                              "<button type='cancel' class='btn cancel'>cancel</button>" +
                            "</div>" +
                          "</form>"),

  events: {
    'click .btn.save': 'addBucket',

    'click .btn.cancel': 'removeForm',

    'click .btn.plus': 'renderForm',

    'click .bucket': 'highlightBucket',

    'click .icon-remove': 'deleteBucket',

    'click .icon-pencil': 'editBucket'
  },

  editBucket: function(event) {
    // $('.sidebar').removeClass('inputting');
    // this.$el.html(this.model;
  },

  renderForm: function() {
    $('.sidebar').toggleClass('inputting');
    this.$('.btn.plus').after(this.editTemplate());
  },

  deleteBucket: function(event) {
    var $target = $(event.target);
    $target.parent().remove();
  },

  highlightBucket: function(event) {
    var $target = $(event.target);
    $target.parent().toggleClass('active');
  },

  addBucket: function() {
    $('.sidebar').toggleClass('inputting');
    this.collection.add({bucketName: $('.bucket-name').val(), emails: $('.bucket-email').val()});
  },

  removeForm: function() {
    $('.form-horizontal').remove();
    $('.sidebar').toggleClass('inputting');
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(
      [this.template()].concat(
        this.collection.map(function(bucket) {
          return new BucketView({model: bucket}).render();
        })
      )
    );
    // return this.$el.html(this.collection.map(function(bucket) {
    //   return new BucketView({model: bucket}).render();
    // }));
  }
});
