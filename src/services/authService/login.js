import axios from 'axios'

async function loginAuth(data) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/login`, data)
  return res.data
}
export default loginAuth
