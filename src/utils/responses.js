const STATUS_MESSAGES = {
  200: 'success',
  201: 'success',
  400: 'fail',
  401: 'fail',
  403: 'fail',
  404: 'fail',
  500: 'error',
  409: 'fail'
}

export function sendDataResponse(res, statusCode, payload) {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    data: payload
  })
}

export function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    error: message
  })
}
