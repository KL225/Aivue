export const onRequest = async (context) => {
  const { request } = context
  const url = new URL(request.url)

  // 提取路径，例如 /api/test-api -> test-api
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

    return new Response(JSON.stringify({
      success: true,
      message: 'Test function working',
      method: request.method,
      pathname: url.pathname,
      backendUrl: backendUrl.toString(),
      backendStatus: response.status,
      backendResponse: data
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Backend error',
      error: error.message
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}