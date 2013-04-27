BucketListView = Backbone.View.extend({

  el:'div.sidebar',

  initialize: function() {
    this.collection.on("add remove", this.render, this);
  },

  template: _.template("<li class='nav-header header-font'>Your Buckets</li>" +
                        "<a class='btn plus' href='#''><i class='icon-plus'></i></a>"),

  events: {
    'click .sidebar .btn.save': 'addBucket',

    'click .btn.plus': function() {
      console.log('button clicked');
      $('.sidebar').toggleClass('inputting');
      $('.btn.plus').after("<form class='form-horizontal add-bucket'>" +
                            "<div class='control-group'>" +
                              "<input class='bucket-name' type='text' placeholder='bucket name'>" +
                              "<textarea class='bucket-email' type='text' placeholder='bucket emails'></textarea>" +
                              "<button type='save' class='btn save'>save</button>" +
                              "<button type='cancel' class='btn cancel'>cancel</button>" +
                            "</div>" +
                          "</form>");
    }
  },

   addBucket: function() {
    $('.sidebar').removeClass('inputting');
    this.collection.add({bucketName: $('.bucket-name').val(), emails: $('.bucket-email').val()});
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(this.collection.map(function(bucket) {
      return new BucketView({model: bucket}).render();
    }));
  }
});
