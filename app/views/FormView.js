FormView = Backbone.View.extend({

  initialize: function() {
    this.editing = !!this.model;
    console.log(this.editing);
    this.model = this.model || new Bucket();
    this.model.set({editing: this.editing});
    if(this.editing) {
      this.model.set({bucketName: '', emails: ''});
    }
  },

  template: _.template("<form class='form-horizontal add-bucket'>" +
                          "<div class='control-group'>" +
                            "<input class='bucket-name' type='text' placeholder='bucket name' value=<%=bucketName%>>" +
                            "<textarea class='bucket-email' type='text' placeholder='bucket emails'><%=emails%></textarea>" +
                            "<button type='save' class='btn save'><% if(this.editing) { print('edit'); } else { print('add'); } %></button>" +
                            "<button type='cancel' class='btn cancel'>cancel</button>" +
                          "</div>" +
                        "</form>"),

  events: {
    'click .btn.save': 'addBucket',

    'click .btn.cancel': 'removeForm',

    'click .btn.edit': 'editBucket'
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

  editBucket: function() {
    this.model.set({bucketName: $('.bucket-name').val(), emails: $('.bucket-email').val()});
  },

  render: function() {
    this.$el.children().detach();
    console.log(this.model.attributes);
    return this.$el.html(this.template(this.model.attributes));
  }
});