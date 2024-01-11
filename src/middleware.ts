// import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

// export const config = {
//   matcher: ['/dashboard/:path*', '/auth-callback'],
// }

// export default authMiddleware

import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
export default function middleware(req: any) {
  return withAuth(req);
}
export const config = {
  // matcher: ["/admin"]
  matcher: ['/dashboard/:path*', '/auth-callback'],
};
