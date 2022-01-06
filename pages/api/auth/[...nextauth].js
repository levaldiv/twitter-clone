import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // configuire one or more auth providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // manipulating some of the thigs here
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session.user.name
        // splits the name so it can have spaces bw first and last
        .split(" ")
        // joining them without the space
        .join("")
        // convert username to lower case
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },
});
