export const onRequest = async (context) => {
  const { request, params, env } = context
  const path = params.path ? params.path.join('/') : ''

  const url = new URL(request.url)
  const backendUrl = new URL(`http://159.75.169.224:1235/${path}`)
  backendUrl.search = url.search

  const headers = new Headers()
  headers.set('Content-Type', request.headers.get('Content-Type') || 'application/json')
  headers.set('token', request.headers.get('token') || '')

  try {
    const response = await fetch(backendUrl.toString(), {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    })

    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, token',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ code: '-1', msg: '后端服务不可用' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}