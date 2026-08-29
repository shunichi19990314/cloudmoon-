const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// すべてのアクセス（/）をCloudMoonのWeb版に転送する設定
app.use('/', createProxyMiddleware({
  target: 'https://cloudmoonapp.com',
  changeOrigin: true,
  ws: true,
  logger: console,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // 相手のサーバーに拒否されないための偽装設定
      proxyReq.setHeader('referer', 'https://cloudmoonapp.com/');
      proxyReq.setHeader('origin', 'https://cloudmoonapp.com');
    }
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
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
