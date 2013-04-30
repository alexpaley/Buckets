Bucket = Backbone.Model.extend({

  idAttribute: "_id",

  defaults: {
    bucketName: '',
    emails: '',
    editing: false
  },

  edit: function() {
    this.trigger('edit', this);
  }
});
