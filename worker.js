export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 只代理 /api 开头的请求
    if (!url.pathname.startsWith('/api')) {
      return new Response('Not Found', { status: 404 });
    }

    // 转发到后端
    const backendUrl = `http://159.75.169.224:1235${url.pathname}${url.search}`;

    const response = await fetch(backendUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'token': request.headers.get('token') || ''
      },
      body: request.method !== 'GET' ? await request.text() : undefined
    });

    // 添加 CORS 头
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', 'https://aivue.pages.dev');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, token');

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }
}