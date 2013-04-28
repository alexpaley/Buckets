Bucket = Backbone.Model.extend({

  defaults: {
    bucketName: '',
    emails: '',
    editing: false
  },

  edit: function() {
    this.trigger('edit', this);
  }
});
