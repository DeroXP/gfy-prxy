const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  const targetUrl = 'https://www.blackbox.ai/';

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.writeHead(200);
    res.end();
    return;
  }

  proxy.web(req, res, {
    target: targetUrl,
    secure: true,
    changeOrigin: true,
    timeout: 10000, // Set a timeout of 10 seconds
  }, (err) => {
    if (err) {
      console.error(`Error proxying request to ${targetUrl}:`, err);
      res.writeHead(500);
      res.end();
    }
  });

  console.log(`Proxying request to ${targetUrl}${req.url}`);
});

server.on('checkHealth', () => {
  console.log('Health check received');
  // You can add custom health check logic here
});

server.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});


npm install http-proxy
