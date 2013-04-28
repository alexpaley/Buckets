Bucket = Backbone.Model.extend({

  defaults: {
    bucketName: '',
    emails: ''
  },

  edit: function() {
    this.trigger('edit', this);
  }
});
