const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const cloudmoonProxy = createProxyMiddleware({
  target: 'https://cloudmoonapp.com',
  changeOrigin: true,
  ws: true,
  logger: console,
  on: {
    proxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('referer', 'https://cloudmoonapp.com/');
    }
  }
});

app.use('/', cloudmoonProxy);

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
