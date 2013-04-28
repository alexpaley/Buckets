BucketView = Backbone.View.extend({

  tagName: 'li',
  className: 'bucket',

  initialize: function() {
    this.model.on("destroy", this.remove, this);
    this.model.on("change", this.render, this);
  },

  template: _.template("<a href='#'>" +
                         "<i class='icon-user icon-white'></i>" + ' ' + '<%= bucketName %>' +
                         "<i class='icon-pencil icon-white'></i>" +
                         "<i class='icon-remove icon-white'></i>" +
                       "</a>"),

  events: {
    'click .icon-remove': 'deleteBucket',

    'click .icon-pencil': 'triggerEditEvent'
  },

  deleteBucket: function(event) {
    this.model.destroy();
  },

  triggerEditEvent: function(event) {
    this.model.edit();
  },

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }
});
