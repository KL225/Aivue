export async function onRequest(context) {
  const { request } = context
  
  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, token',
      }
    })
  }

  const url = new URL(request.url)
  const path = url.pathname.replace('/api/', '')
  const targetUrl = 'http://159.75.169.224:1235/api/' + path + url.search

  try {
    const fetchOptions = {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    // 添加 token 头
    const token = request.headers.get('token')
    if (token) {
      fetchOptions.headers['token'] = token
    }

    // 处理请求体
    if (request.method !== 'GET') {
      const body = await request.text()
      if (body) {
        fetchOptions.body = body
      }
    }

    const response = await fetch(targetUrl, fetchOptions)
    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, token',
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy error', message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}
