export const onRequest = async (context) => {
  return new Response(JSON.stringify({
    success: true,
    message: 'Cloudflare Pages Function is working!',
    pathname: context.request.url
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
}