import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials.username == "admin" &&
          credentials.password == "admin1234"
        ) {
          return credentials;
        }
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
