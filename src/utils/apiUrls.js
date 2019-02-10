const _base = 'https://jg83vtnwdj.execute-api.us-east-2.amazonaws.com'
const _dev = `${_base}/Dev`

const API_URLS = {
  DEV: {
    ALL_SCORES_API: `${_dev}/scores`,
    SAVE_SCORE_API: `${_dev}/scores`
  }
}

export default API_URLS
