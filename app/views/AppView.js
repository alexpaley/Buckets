AppView = Backbone.View.extend({

  className: 'mainApp',

  render: function() {
    return this.$el.html(
      new BucketListView({collection: this.model.get('bucketList')}).render()
    );
  }
});
