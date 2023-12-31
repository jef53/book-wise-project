//import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaAdapter } from '../../../lib/auth/prismaAdapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export function buildNextAuthOptions(req: NextApiRequest, res: NextApiResponse,): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        profile(profile: GithubProfile) {
          return {
            id: profile.id,
            name: profile.name!,
            email: profile.email!,
            avatar_url: profile.avatar_url,

          }
        }
      }),

      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatar_url: profile.picture,
          }
        }
      })
    ],

    callbacks: {
      async session({ session, user }) {
        return {
          ...session,
          user
        }
      }
    }
  }
}


export default async function (req: NextApiRequest, res: NextApiResponse) {
  await NextAuth(req, res, buildNextAuthOptions(req, res))
}