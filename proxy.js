const http = require('http');
const httpProxy = require('http-proxy');
const readline = require('readline');

const proxy = httpProxy.createProxyServer({});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = http.createServer((req, res) => {
  rl.question('Please enter the URL you want to visit (or type "skip" to go to https://www.perplexity.ai/): ', (answer) => {
    const targetURL = 'https://www.perplexity.ai/'

    console.log('Proxying request for:', req.url);
    proxy.web(req, res, {
      target: targetURL,
      secure: true,
      changeOrigin: true
    });

    console.log('Connected to site:', targetURL);
  });
});

server.listen(3000, () => {
  console.log('Proxy server listening on port 3000');
});
