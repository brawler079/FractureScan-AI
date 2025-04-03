import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/upload", // ✅ Ensure this API route is public if needed
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth.protect();   // ✅ Correct
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // ✅ Protect all frontend pages
    "/api/:path*", // ✅ API routes still go through Clerk, but need `getAuth()`
  ],
};
