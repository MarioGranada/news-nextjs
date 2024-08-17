export function GET(request) {
  console.log('in here oe request', { request });
  return new Response('Hello, Next.js!');
}

export function POST(request) {
  console.log('in here oe request', { request });
  return new Response('Hello, Next.js! POST');
}
