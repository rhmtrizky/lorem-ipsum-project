import { compare } from 'bcrypt';
import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';
import { loginWithGoogle, signIn } from '@/services/auth/service';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await signIn(email);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phoneNumber = user.phoneNumber;
        token.password = user.password;
        token.role = user.role;
        token.id = user.id;
        token.image = user.image;
        // token.address = user.address;
      }

      if (account?.provider === 'google') {
        const data = {
          email: user.email,
          image: user?.image,
          fullname: user.name,
          phoneNumber: user.phoneNumber,
          //   address: user.address,
          role: user.role,
          type: 'google',
        };

        await loginWithGoogle(data, (data) => {
          token.email = data.email;
          token.fullname = data.fullname;
          token.phoneNumber = data.phoneNumber;
          //   token.address = data?.address;
          token.image = data?.image;
          token.role = data.role;
          token.id = data.id;
        });
      }
      return token;
    },
    async session({ session, token }) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('fullname' in token) {
        session.user.fullname = token.fullname;
      }
      if ('phoneNumber' in token) {
        session.user.phoneNumber = token.phoneNumber;
      }
      //   if ('address' in token) {
      //     session.user.address = token.address;
      //   }
      if ('password' in token) {
        session.user.password = token.password;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('id' in token) {
        session.user.id = token.id;
      }
      if ('image' in token) {
        session.user.image = token.image;
      }
      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || '', {
        algorithm: 'HS256',
      });
      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default nextAuth(authOptions);
