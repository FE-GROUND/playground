import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
