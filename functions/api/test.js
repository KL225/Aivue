export async function onRequest(context) {
  return new Response(JSON.stringify({ 
    message: 'API proxy is working',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
