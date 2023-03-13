const checkFilesPayload = (req, res, next) => {
	const { files } = req

	if (!files) return res.status(400).json({ status: 'error', message: 'Missing files' })

	next()
}

module.exports = checkFilesPayload
