export async function onRequest(context) {
  const { request, env } = context
  
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

  console.log('Proxying request to:', targetUrl)

  try {
    // 构建请求头
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
    
    // 转发 token 头
    const token = request.headers.get('token')
    if (token) {
      headers['token'] = token
    }

    // 构建请求选项
    const fetchOptions = {
      method: request.method,
      headers: headers,
    }

    // 处理请求体
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const body = await request.text()
      if (body) {
        fetchOptions.body = body
      }
    }

    const response = await fetch(targetUrl, fetchOptions)
    const data = await response.text()

    console.log('Response status:', response.status)
    console.log('Response data:', data)

    // 返回响应
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
    console.error('Proxy error:', error)
    return new Response(JSON.stringify({ 
      error: 'Proxy error', 
      message: error.message,
      targetUrl: targetUrl 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}
