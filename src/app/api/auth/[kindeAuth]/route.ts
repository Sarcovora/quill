import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'

// TODO: might use the one givin below instead of everything above?
export const GET = handleAuth();

// import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'
// import { NextRequest } from 'next/server'

// export async function GET(
//   request: NextRequest,
//   { params }: any
// ) {
//   const endpoint = params.kindeAuth
//   return handleAuth(request, endpoint)
// }