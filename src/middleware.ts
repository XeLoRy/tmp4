import { auth } from "@/auth";

export default auth((req) => {
  // Middleware logic can be added here
  // For now, just pass through
});

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|images|admin).*)",
  ],
};
