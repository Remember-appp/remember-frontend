import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import loginAuth from '@/services/authService/login'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
        req: any
      ) {
        try {
          const res = await loginAuth({
            email: credentials.email,
            password: credentials.password,
          })
           console.log('authorize response:', res)
          const user = res.user || res
          const token = res.token
          if (!user || !user.id) {
            console.log('Invalid user data:', user)
            return null
          }
          return { ...user, token }
        } catch (error) {
          const message = error?.response?.data?.message
          throw new Error(message)
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
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      if (!session.user) console.error('token.user is missing!')
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
