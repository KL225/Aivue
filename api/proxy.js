export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token')

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const targetUrl = 'http://159.75.169.224:1235' + req.url.replace('/api/proxy', '')

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      }
    }

    // 添加 token 头
    if (req.headers.token) {
      fetchOptions.headers['token'] = req.headers.token
    }

    // 处理请求体
    if (req.method !== 'GET' && req.body) {
      fetchOptions.body = JSON.stringify(req.body)
    }

    const response = await fetch(targetUrl, fetchOptions)
    const data = await response.json()

    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', message: error.message })
  }
}
