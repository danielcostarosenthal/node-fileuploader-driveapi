require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')

const checkFilesPayload = require('./middleware/checkFilesPayload')
const checkFilesExtensions = require('./middleware/checkFilesExtensions')
const checkFilesSize = require('./middleware/checkFilesSize')
const { createFileInDrive, createFolderInDrive } = require('./controller/createFileAndFolderController')

const { deleteFile, deleteFolder } = require('./controller/deleteFileAndFolderController')

const app = express()

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', fileUpload({ createParentPath: true }), checkFilesPayload, checkFilesExtensions(['.png', '.jpg', '.jpeg', '.pdf']), checkFilesSize, async (req, res) => {
	try {
		const { body, files } = req
		const folderName = body.folderName
		const assetsFolder = 'assets'
		folderName ? await createFolderInDrive(folderName) : null

		Object.keys(files).forEach((key) => {
			const fileName = files[key].name
			const filePath = path.join(__dirname, assetsFolder, folderName, fileName)
			const folderPath = path.join(__dirname, assetsFolder, folderName)

			files[key].mv(filePath, async (err) => {
				await createFileInDrive(fileName, filePath)

				await deleteFile(filePath)
				await deleteFolder(folderName, folderPath)

				if (err) return res.status(500).json({ status: 'error', message: err })
			})
		})

		return res.json({ status: 'success', message: folderName ? `${assetsFolder}\\${folderName}\\${Object.keys(files).toString()}` : `${assetsFolder}\\${Object.keys(files).toString()}` })
	} catch (err) {
		console.log(err.message)
	}
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
