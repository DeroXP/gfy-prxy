const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  console.log('Proxying request for:', req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  proxy.web(req, res, {
    target: 'https://copilot.microsoft.com/',
    secure: true,
    changeOrigin: true
  });

  console.log('Connected to site: ', req.url);
});

server.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
