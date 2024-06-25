class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

function handleError (err, req, res, next) {
  const { statusCode, message } = err
  global.logger.error({ statusCode, message })
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
};

export { handleError, ErrorHandler }
