Buckets
=======

The full scope of the project is to produce a Chrome extension for seamless drag-and-drop transfer of browser content (images, links, etc.) between friends.

As a minimum viable product, I have built a platform which allows a user to create groups of friends (with associated email addresses attached), upload files via drag-and-drop onto a view, and select the groups of friends to whom those files will be emailed.

The app was built in javascript on both the client and server-side. The Backbone MV framework was used to organize the code on the client. Dropzone.js was also used for the drag-and-drop functionality and view rendering on the client. On the server side, Express (Node.js) and MongoDB were used. For the final step, the npm module 'nodemailer' was used to deliver the emails between friends.

Regarding this repository, it would be most fruitful to start by looking at the Backbone files within the 'public/app' folder.
