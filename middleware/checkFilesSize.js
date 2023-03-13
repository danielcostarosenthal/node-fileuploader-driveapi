const MB = 5
const fileSizeLimit = MB * 1024 * 1024

const checkFilesSize = (req, res, next) => {
	const { files } = req
	const filesOverLimit = []
	Object.keys(files).forEach((key) => {
		if (files[key].size > fileSizeLimit) {
			filesOverLimit.push(files[key].name)
		}
	})

	if (filesOverLimit.length) {
		const isOrAre = filesOverLimit.length === 0 ? 'is' : 'are'
		const sentence = `Upload failed. ${filesOverLimit.toString()} ${isOrAre} over the file size limit of ${MB} MB.`.replaceAll(',', ', ')
		const message = filesOverLimit.length < 3 ? sentence.replace(',', ' and') : sentence.replace(/,(?=[^,]*$)/, ' and')

		return res.status(413).json({ status: 'error', message: message })
	}

	next()
}

module.exports = checkFilesSize
