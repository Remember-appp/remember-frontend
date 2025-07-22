import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          )
          const user = res.data
          console.log('authorize > user:', user)
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
