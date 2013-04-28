FormView = Backbone.View.extend({

  template: _.template("<form class='form-horizontal add-bucket'>" +
                          "<div class='control-group'>" +
                            "<input class='bucket-name' type='text' placeholder='bucket name'>" +
                            "<textarea class='bucket-email' type='text' placeholder='bucket emails'></textarea>" +
                            "<button type='save' class='btn save'>save</button>" +
                            "<button type='cancel' class='btn cancel'>cancel</button>" +
                          "</div>" +
                        "</form>"),

  events: {
    'click .btn.save': 'addBucket',

    'click .btn.cancel': 'removeForm'
  },

  addBucket: function() {
    this.model.set({bucketName: $('.bucket-name').val(), emails: $('.bucket-email').val()});
    $('.sidebar').toggleClass('inputting');
    this.collection.add({bucketName: this.model.attributes.bucketName, emails: this.model.attributes.emails});
    console.log(this.model.attributes);
    console.log(this.form, this.model, this.collection);
  },

  removeForm: function() {
    //TODO: Is it better to use HIDE() or REMOVE() here????
    $('.form-horizontal').remove();
    $('.sidebar').toggleClass('inputting');
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(this.template());
  }
});