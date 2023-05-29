import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import GoogleProvider from "next-auth/providers/google"

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  // Customize your session handling and other options here
};

export default NextAuth(options);