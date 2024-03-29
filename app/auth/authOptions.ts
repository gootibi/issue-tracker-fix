import prisma from "@/prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions: NextAuthOptions = {
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
  }

  export default authOptions