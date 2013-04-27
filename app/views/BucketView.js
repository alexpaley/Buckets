BucketView = Backbone.View.extend({
  tagName: 'li',

  template: _.template("<a href='#'>" +
                         "<i class='icon-user icon-white'></i>" + ' ' + '<%= bucketName %>' +
                         "<i class='icon-pencil icon-white'></i>" +
                         "<i class='icon-remove icon-white'></i>" +
                       "</a>"),

  render: function() {
    this.$el.addClass('bucket');
    return this.$el.html(this.template(this.model.attributes));
  }
});
