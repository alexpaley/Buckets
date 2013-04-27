AppView = Backbone.View.extend({

  template: _.template("<div class='sidebar nav nav-list'></div>"),

  render: function() {
    return this.$el.html([
      this.template(),
      new BucketListView({collection: this.model.get('bucketList')}).render()
    ]);
  }
});
