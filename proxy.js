// Import required modules
const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Create an HTTP server
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

  // Remove the following line as it may cause issues if the target URL expects a different path
  // req.url = '/';

  proxy.web(req, res, {
    target: targetUrl,
    secure: true,
    changeOrigin: true,
    timeout: 10000,
    // Remove the wouldRedirect option as it is not necessary
    // wouldRedirect: function(req, res) {
    //   return false;
    // }
  }, (err) => {
    if (err) {
      console.error(`Error proxying request to ${targetUrl}:`, err);
      res.writeHead(500);
      res.end();
    } else {
      console.log(`Proxying request to ${targetUrl}${req.url}`);
    }
  });
});

// Remove the checkHealth event handler as it is not clear what it is supposed to do
// server.on('checkHealth', () => {
//   const health = checkHealthStatus();
//   if (health.status === 'healthy') {
//     res.writeHead(200);
//     res.end('Healthy');
//   } else {
//     res.writeHead(500);
//     res.end('Unhealthy');
//   }
// });

server.listen(3000, () => {
  console.log(`Proxy server listening on port %d`, 3000);
});

// Install the http-proxy module as a regular dependency
const installModule = (moduleName, flag) => {
  return new Promise((resolve, reject) => {
    const exec = require('child_process').exec;
    const command = `npm install ${moduleName} --save`; // Change the flag to --save
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Installed ${moduleName} ${flag}`);
        resolve();
      }
    });
  });
};

installModule('http-proxy', '--save')
  .then(() => {
    console.log('Installation completed');
  })
  .catch((error) => {
    console.error('Error installing module:', error);
  });