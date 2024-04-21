const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  console.log('Proxying request for:', req.url);
  
  req.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
  req.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
  req.headers['Accept-Language'] = 'en-US,en;q=0.9';
  req.headers['Accept-Encoding'] = 'gzip, deflate, br';
  req.headers['Referer'] = 'https://www.google.com/';
  
  const delay = Math.floor(Math.random() * (2000 - 3000 + 1)) + 3000;
  setTimeout(() => {
    proxy.web(req, res, {
      target: 'https://copilot.microsoft.com/',
      secure: true,
      changeOrigin: true
    });
    console.log('Connected to site:', req.url);
  }, delay);
});

server.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
