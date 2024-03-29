import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma), // Add prisma adapter (in schema.prisma file created manual a models Account, Session, User, VerificationToken)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session:{
    strategy: "jwt" // Add session strategy OAuth authentication use this "jwt"
  }
})

export { handler as GET, handler as POST }