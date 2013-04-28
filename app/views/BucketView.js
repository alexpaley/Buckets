BucketView = Backbone.View.extend({
  tagName: 'li',

  initialize: function() {
    this.model.on("destroy", this.remove, this);
  },

  template: _.template("<a href='#'>" +
                         "<i class='icon-user icon-white'></i>" + ' ' + '<%= bucketName %>' +
                         "<i class='icon-pencil icon-white'></i>" +
                         "<i class='icon-remove icon-white'></i>" +
                       "</a>"),

  events: {
    'click .icon-remove': 'deleteBucket',

    'click .icon-pencil': 'editBucket'
  },

  editBucket: function(event) {
    console.log('In editBucket');
    // $('.sidebar').removeClass('inputting');
    // this.$el.html(this.model;
  },

  deleteBucket: function(event) {
    console.log('X button clicked');
    this.model.destroy();
  },

  render: function() {
    this.$el.addClass('bucket');
    console.log('In the BucketView render');
    return this.$el.html(this.template(this.model.attributes));
  }
});
