export const onRequest = async (context) => {
  const { request } = context

  return new Response(JSON.stringify({
    success: true,
    message: 'API function is working!',
    method: request.method,
    pathname: new URL(request.url).pathname
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}