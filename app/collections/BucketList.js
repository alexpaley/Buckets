BucketList = Backbone.Collection.extend({
  model: Bucket,

  addNew: function() {
    this.trigger('addNew', this);
  }

});
