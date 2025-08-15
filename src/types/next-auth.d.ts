import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user?: {
      id: string | number
      name?: string
      email?: string
    }
  }
  interface User {
    token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    user?: {
      id: string | number
      name?: string
      email?: string
    }
  }
}
