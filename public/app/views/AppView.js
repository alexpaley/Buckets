AppView = Backbone.View.extend({

  render: function() {
    var myDropzone = new Dropzone("#bucketImage", {
      url: "/target",
      dictDefaultMessage: "",
      previewsContainer: ".dropzone-previews"
    });

    return this.$el.html(
      new BucketListView({collection: this.model.get('bucketList')}).render()
    );
  }
});
