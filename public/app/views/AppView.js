AppView = Backbone.View.extend({

  render: function() {
    var myDropzone = new Dropzone("#bucketImage", {
      url: "/target",
      dictDefaultMessage: "",
      previewsContainer: ".dropzone-previews"
    });

    var bucketListView = new BucketListView({collection: this.model.get('bucketList')});

    myDropzone.on("sending", function(event, xhr, formData) {
      console.log(bucketListView.grabSelectedEmails().join(','));
      formData.append("emailList", bucketListView.grabSelectedEmails().join(','));
    });

    return this.$el.html(
      bucketListView.render()
    );
  }
});
