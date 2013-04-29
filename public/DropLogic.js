Dropzone.options.dropTarget = { dictDefaultMessage: "" };

new Dropzone(document.body, {
  previewsContainer: ".dropzone-previews",
  url: '/target',
  clickable: false
});