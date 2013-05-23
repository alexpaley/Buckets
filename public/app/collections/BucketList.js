BucketList = Backbone.Collection.extend({
  idAttribute: "_id",

  model: Bucket,

  url : '/api'

});
