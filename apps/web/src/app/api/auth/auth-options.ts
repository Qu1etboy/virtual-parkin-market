import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { NextResponse } from "next/server";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "me@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // throw new Error("ไม่พบอีเมลในระบบ");
          // return new NextResponse(
          //   JSON.stringify({ errors: { email: "ไม่พบอีเมลในระบบ" } }),
          //   { status: 400 }
          // );
        }

        if (!bcrypt.compareSync(password, user.password ?? "")) {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // throw new Error("รหัสผ่านไม่ถูกต้อง");
          // return new NextResponse(
          //   JSON.stringify({ errors: { password: "รหัสผ่านไม่ถูกต้อง" } }),
          //   { status: 400 }
          // );
        }

        console.log(user);

        // Any object returned will be saved in `user` property of the JWT
        return user;
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ user, token }) => {
      // console.log("[jwt] user = ", user);
      // console.log("[jwt] token = ", token);

      return token;
    },

    session: async ({ session, token }) => {
      if (session.user) {
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          include: {
            customerProfile: true,
            addresses: true,
            accounts: {
              select: {
                provider: true,
              },
            },
          },
        });

        if (user) {
          session.user = user;
        }
      }

      // console.log("[session] session = ", session);
      // console.log("[session] token = ", token);

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
