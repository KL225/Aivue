// 处理 OPTIONS 预检请求
export const onRequestOptions = async (context) => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, token',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export const onRequest = async (context) => {
  const { request, env } = context
  const url = new URL(request.url)

  // 提取路径，保留/api前缀，例如 /api/user/login -> api/user/login
  const pathParts = url.pathname.split('/').filter(p => p)
  const backendPath = pathParts.join('/')

  const backendUrl = new URL(`http://159.75.169.224:1235/${backendPath}`)
  backendUrl.search = url.search

  // 调试信息
  const debugInfo = {
    originalUrl: url.toString(),
    backendUrl: backendUrl.toString(),
    method: request.method,
    pathname: url.pathname,
    backendPath: backendPath
  }

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

    // 如果后端返回 405 或其他错误，仍然返回后端的响应内容以便调试
    if (response.status !== 200 && response.status !== 201) {
      return new Response(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        debug: debugInfo,
        backendHeaders: Object.fromEntries(response.headers.entries()),
        backendResponse: data
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, token',
        },
      })
    }

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
    return new Response(JSON.stringify({ code: '-1', msg: '后端服务不可用', debug: debugInfo }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}