FormView = Backbone.View.extend({

  template: _.template("<form class='form-horizontal add-bucket'>" +
                          "<div class='control-group'>" +
                            "<input class='bucket-name' type='text' placeholder='bucket name' value=<%=bucketName%>>" +
                            "<textarea class='bucket-email' type='text' placeholder='bucket emails'><%=emails%></textarea>" +
                            "<button type='save' class='btn save'>add</button>" +
                            "<button type='cancel' class='btn cancel'>cancel</button>" +
                          "</div>" +
                        "</form>"),

  events: {
    'click .btn.save': 'addBucket',

    'click .btn.cancel': 'removeForm',

    'click .btn.edit': 'removeForm'
  },

  addBucket: function() {
    this.model.set({bucketName: $('.bucket-name').val(), emails: $('.bucket-email').val()});
    $('.sidebar').toggleClass('inputting');
    this.collection.add({bucketName: this.model.attributes.bucketName, emails: this.model.attributes.emails});
  },

  removeForm: function() {
    $('.form-horizontal').remove();
    $('.sidebar').toggleClass('inputting');
  },

  render: function() {
    this.$el.children().detach();
    return this.$el.html(this.template(this.model.attributes));
  }
});