import { NextResponse } from 'next/server';

export const middleware = (request) => {
  console.log('in here oe request', { request });
  return NextResponse.next();
};

export const config = {
  // Middleware will only run for the routes included in this matcher. That means it won't run for routes outside of it, like icon, images or any assets or path that does not belong to the routes in the matcher.
  matcher: '/news',
};
