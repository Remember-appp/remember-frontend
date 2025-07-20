const { default: axios } = require('axios')

async function loginAuth(data) {
  const res = await axios.post('url', data)
  return res.data
}
export default loginAuth
