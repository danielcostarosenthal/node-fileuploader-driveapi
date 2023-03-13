const path = require('path')

const checkFilesExtensions = (allowedExtensionsArray) => {
	return (req, res, next) => {
		const { files } = req

		const fileExtensions = []
		Object.keys(files).forEach((key) => {
			fileExtensions.push(path.extname(files[key].name))
		})

		// Are the file extension allowed?
		const isAllowed = fileExtensions.every((ext) => allowedExtensionsArray.includes(ext))

		if (!isAllowed) {
			const message = `Upload failed. Only ${allowedExtensionsArray.toString()} files allowed.`.replaceAll(',', ', ')

			return res.status(422).json({ status: 'error', message: message })
		}

		next()
	}
}

module.exports = checkFilesExtensions
