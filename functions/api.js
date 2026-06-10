export const onRequest = async (context) => {
  const { request, env } = context
  const url = new URL(request.url)

  // 提取路径，例如 /api/user/login -> user/login
  const pathParts = url.pathname.split('/').filter(p => p && p !== 'api')
  const backendPath = pathParts.join('/')

  const backendUrl = new URL(`http://159.75.169.224:1235/${backendPath}`)
  backendUrl.search = url.search

  const headers = new Headers()
  const contentType = request.headers.get('Content-Type')
  if (contentType) headers.set('Content-Type', contentType)

  const token = request.headers.get('token')
  if (token) headers.set('token', token)

  try {
    const response = await fetch(backendUrl.toString(), {
      method: request.method,
      headers: headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
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