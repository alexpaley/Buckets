BucketList = Backbone.Collection.extend({
  idAttribute: "_id",

  model: Bucket,

  url : '/api',

  addNew: function() {
    this.trigger('addNew', this);
  }

});
