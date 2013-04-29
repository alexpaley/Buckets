FormView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('addNew', function() {
      this.model = new Bucket();
    }, this);

    this.collection.on('edit', function(model) {
      this.model = model;
      this.model.set('editing', true);
      $('.sidebar').toggleClass('inputting');
      $('.btn.plus').after(this.render());
    }, this);
  },

  template: _.template("<form class='form-horizontal add-bucket'>" +
                          "<div class='control-group'>" +
                            "<input class='bucket-name' type='text' placeholder='bucket name' value='<%-bucketName%>'>" +
                            "<textarea class='bucket-email' type='text' placeholder='bucket emails (comma separated)'><%-emails%></textarea>" +
                            "<% if(editing) { %>" +
                              "<button type='edit' class='btn edit'>edit</button>" +
                            "<% } else { %>" +
                              "<button type='save' class='btn save'>save</button>" +
                            "<% } %>" +
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
    this.collection.create({bucketName: this.model.attributes.bucketName, emails: this.model.attributes.emails});
  },

  removeForm: function() {
    $('.form-horizontal').remove();
    $('.sidebar').toggleClass('inputting');
  },

  editBucket: function() {
    console.log('in edit bucket');
    this.model.set({bucketName: this.$('.bucket-name').val(), emails: this.$('.bucket-email').val()});
    this.model.save();
    this.removeForm();
  },

  render: function() {
    this.$el.children().detach();
    this.$el.html(this.template(this.model.attributes));
    return this.el;
  }
});