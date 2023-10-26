import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequest) {
    return NextResponse.next();
  }
);

export const config = {
  matcher: [
    "/seller/:path*",
    "/admin/:path*",
    "/orders/:path*",
    "/address/:path*",
    "/account/:path*",
    "/profile/:path*",
  ],
};
