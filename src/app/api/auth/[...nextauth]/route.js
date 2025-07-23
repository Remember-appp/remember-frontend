import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('API URL:', process.env.NEXT_PUBLIC_API_BACKEND_URL)
        if (!credentials?.email || !credentials?.password) return null
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          )
          const user = res.data.user || res.data
          console.log('authorize > user:', user)
          if (!user || !user.id) {
            console.log('Invalid user data:', user)
            return null
          }
          return user || null
        } catch (error) {
          console.error(`Authorize error: ${error}`)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      if (!session.user) console.error('token.user is missing!')
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
