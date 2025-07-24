import axios from 'axios'

type RegisterData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

async function registerAuth(data: RegisterData) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/register`,
    data
  )
  return res.data
}
export default registerAuth
