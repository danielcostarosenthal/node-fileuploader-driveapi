const fs = require('fs')
const { google } = require('googleapis')

const auth = new google.auth.GoogleAuth({
	keyFile: './driveAPI_Credentials.json',
	scopes: 'https://www.googleapis.com/auth/drive'
})
const drive = google.drive({ version: 'v3', auth: auth })
const defaultFolderId = process.env.DEFAULT_FOLDER_ID
let folderId

const createFileInDrive = async (name, path) => {
	const filesResource = {
		name: name,
		parents: [folderId ? folderId : defaultFolderId]
	}

	const filesMedia = {
		mimeType: 'image/jpg, application/pdf',
		body: fs.createReadStream(path)
	}

	const response = await drive.files.create({
		resource: filesResource,
		media: filesMedia,
		fields: 'id, name' // Returns the id/name of the file created
	})

	if (response.status === 200) {
		console.log(`File Created, Id: ${response.data.id}`)
	}

	folderId = null

	return true
}

const createFolderInDrive = async (folderName) => {
	const folderResource = {
		name: folderName || null,
		parents: [defaultFolderId],
		mimeType: 'application/vnd.google-apps.folder'
	}

	const response = await drive.files.create({
		resource: folderResource,
		fields: 'id, name' // Returns the id/name of the folder created
	})

	if (response.status === 200) {
		console.log(`Folder Created, Id: ${response.data.id}`)
	}

	folderId = folderName ? response.data.id : defaultFolderId

	return response.data.id
}

module.exports = { createFileInDrive, createFolderInDrive }
