Dropzone.options.dropTarget = { dictDefaultMessage: "" };

new Dropzone(document.body, {
  previewsContainer: ".dropzone-previews",
  url: '/target',
  // You probably don't want the whole body
  // to be clickable to select files
  clickable: false
});