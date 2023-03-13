const fs = require('fs')

const deleteFile = async (filePath) => {
	fs.rm(filePath, { recursive: true, force: true }, (err) => {
		if (err) {
			throw err
		}
		console.log(`File Deleted ${new Date().toDateString()}`)
	})
}

const deleteFolder = async (folderName, folderPath) => {
	if (folderName) {
		fs.rm(folderPath, { recursive: true, force: true }, (err) => {
			if (err) {
				throw err
			}
			console.log(`Folder Deleted ${new Date().toDateString()}`)
		})
	}
}

module.exports = { deleteFile, deleteFolder }
