export async function onRequest({ request, next, params, env }) {
  const url = new URL(request.url);

  // 拼接后端完整路径
  // params.path 会是数组，比如 ['user', 'login']
  const path = params.path ? params.path.join('/') : '';
  const backendUrl = `http://159.75.169.224:1235/api/${path}${url.search}`;

  // 构造新的请求头
  const headers = {};
  headers['Content-Type'] = 'application/json';
  const token = request.headers.get('token');
  if (token) {
    headers['token'] = token;
  }

  const response = await fetch(backendUrl, {
    method: request.method,
    headers,
    body: request.method !== 'GET' ? await request.text() : undefined
  });

  // 添加 CORS 头
  const newHeaders = new Headers();
  newHeaders.set('Access-Control-Allow-Origin', 'https://aivue.pages.dev');
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, token');

  // 透传后端返回的 headers
  response.headers.forEach((value, key) => {
    newHeaders.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    headers: newHeaders
  });
}