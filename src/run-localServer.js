/// run-devServer.js

const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware: proxy } = require('http-proxy-middleware');

const bundler = new Bundler('index.pug', {
  // Don't cache anything in development
  cache: false,
});

const app = express();
const PORT = process.env.PORT || 5678;

app.use(
  '/api',
  proxy({
    // Your production routes
    pathRewrite: {
      '/api': '/local/api',
    },

    // Your local server
    target: 'http://localhost:3000',
  }),
);

// Pass the Parcel bundler into Express as middleware
app.use(bundler.middleware());

// Run your Express server
app.listen(PORT);
