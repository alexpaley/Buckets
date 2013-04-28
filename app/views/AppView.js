AppView = Backbone.View.extend({

  className: 'mainApp',

  render: function() {
    return this.$el.html(
      new BucketListView({collection: this.model.get('bucketList')}).render(),
      new FormView({collection: this.model.get('bucketList')})
    );
  }
});
