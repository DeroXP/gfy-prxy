const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  console.log('Proxying request for:', req.url);
  proxy.web(req, res, {
    target: 'https://www.perplexity.ai/',
    secure: true,
    changeOrigin: true
  });

  console.log('Connected to site: https://www.perplexity.ai/');
});

server.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
