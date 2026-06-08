// 通用代理函数
async function proxyRequest(request, targetPath) {
  const targetUrl = 'http://159.75.169.224:1235/api' + targetPath

  try {
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
    
    const token = request.headers.get('token')
    if (token) {
      headers['token'] = token
    }

    const fetchOptions = {
      method: request.method,
      headers: headers,
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
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
    return new Response(JSON.stringify({ 
      error: 'Proxy error', 
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
}

export async function onRequest(context) {
  const { request, next } = context
  
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
  
  // 如果是 API 请求，代理到后端
  if (url.pathname.startsWith('/api/')) {
    const targetPath = url.pathname.replace('/api', '') + url.search
    return proxyRequest(request, targetPath)
  }

  // 其他请求继续正常处理
  return next()
}
