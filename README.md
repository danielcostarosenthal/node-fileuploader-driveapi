**Create** an .env file with the DEFAULT_FOLDER_ID variable which will be your folder's ID from Google Drive

**Add a Service Account** to your Google Account and **enable the Drive API**. Official documentation [here](https://support.google.com/workspacemigrate/answer/10839762?hl=en#zippy=%2Cstep-create-the-service-account-in-the-cloud-console)

**Download** this .json file which contains your credentials and **save it to your root folder**. Name it _driveAPI_Credentials.json_

This application only accepts images and PDF's, but obviously it can be expanded to anything by adding more mimeTypes inside the _fileMedia_ object and _createFileInDrive_ controller
