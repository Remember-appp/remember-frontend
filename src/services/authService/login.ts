import axios from 'axios'

type LoginData = {
  email: string
  password: string
}

async function loginAuth(data: LoginData) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL_NEXTAUTH}/api/auth/login`,
    data
  )
  return res.data
}
export default loginAuth
