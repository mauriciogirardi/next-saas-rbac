import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { PATH_AUTH_SIGN_IN } from '@/constants/paths-application'

export async function GET(request: NextRequest) {
  cookies().delete('token')
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = PATH_AUTH_SIGN_IN

  return NextResponse.redirect(redirectUrl)
}
