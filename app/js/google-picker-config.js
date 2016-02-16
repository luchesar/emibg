'use strict';

/**
 * @ngInject
 */
function GooglePickerConfig(lkGoogleSettingsProvider) {
  lkGoogleSettingsProvider.configure({
    apiKey   : 'AIzaSyAxItrIDH-hbw82UDivzpkCe05QxM59k84',
    clientId : '524266717583-l85f2bq571rbiiq0v9rea70mkmi5omhs.apps.googleusercontent.com',
    locale: 'bg'
  });
  lkGoogleSettingsProvider.views = [
    'DocsView().setIncludeFolders(true).setMimeTypes("image/jpeg,imagea/jpg,image/png,")',
    'View(google.picker.ViewId.DOCS_IMAGES)',
    'DocsUploadView().setIncludeFolders(true)',
    'ImageSearchView().setLicense(google.picker.ImageSearchView.License.COMMERCIAL_REUSE)',
    'PhotosView()',
    'PhotoAlbumsView()',
    'View(google.picker.ViewId.PHOTO_UPLOAD)'
  ];
}
module.exports = GooglePickerConfig;
