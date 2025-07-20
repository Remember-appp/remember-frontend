const { default: axios } = require('axios')

async function registerAuth(data) {
  const res = await axios.post('url', data)
  return res.data
}
export default registerAuth
