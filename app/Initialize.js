$(function() {
  var bucketList = new BucketList();
  var app = new App({bucketList: bucketList});
  var appView = new AppView({model: app});
  $('body').append(appView.render());
});