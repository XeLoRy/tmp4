import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

// Configuration de base - à compléter avec Email Provider et Azure
const authConfig: NextAuthConfig = {
  providers: [
    // Email Provider sera configuré avec Microsoft Graph API
    // Pour l'instant, on prépare la structure
  ],
  pages: {
    signIn: "/connexion",
    verifyRequest: "/connexion/verification",
    error: "/connexion/erreur",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/participer/enquete", "/participer/proposer"];
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        return false; // Redirect to login
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
