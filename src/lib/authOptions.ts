import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Check Admin
        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });
        if (admin && (await bcrypt.compare(credentials.password, admin.password))) {
          return { id: admin.id, name: admin.username, role: admin.role };
        }

        // Check Teacher
        const teacher = await prisma.teacher.findUnique({
          where: { username: credentials.username },
        });
        if (teacher && (await bcrypt.compare(credentials.password, teacher.password))) {
          return { id: teacher.id, name: teacher.username, role: teacher.role };
        }

        // Check Student
        const student = await prisma.student.findUnique({
          where: { username: credentials.username },
        });
        if (student && (await bcrypt.compare(credentials.password, student.password))) {
          return { id: student.id, name: student.username, role: student.role };
        }

        // Check Parent
        const parent = await prisma.parent.findUnique({
          where: { username: credentials.username },
        });
        if (parent && (await bcrypt.compare(credentials.password, parent.password))) {
          return { id: parent.id, name: parent.username, role: parent.role };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in", // custom sign-in page
  },
};
