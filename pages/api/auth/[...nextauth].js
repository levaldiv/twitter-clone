import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // configuire one or more auth providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     // prompt: "consent",
      //     // access_type: "offline",
      //     // response_type: "code",
      //   },
      // },
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
  // This secret can be a random string
  secret: process.env.JWT_SECRET,
});
