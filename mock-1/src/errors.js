const RETRYABLE_STATUSES = [408, 429, 500, 502, 503, 504];

function isRetryable(err) {
  return err && RETRYABLE_STATUSES.includes(err.status);
}

module.exports = { isRetryable };