// src/gateway.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { authenticateJWT } from './middleware/authenticate';

dotenv.config();
const app = express();

//Auth Service Proxy
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:9000',
    changeOrigin: true
}));

// Finance Service Proxy (protected)
app.use('/api/finances',authenticateJWT, createProxyMiddleware({
    target: 'http://localhost:8000',
    changeOrigin: true
}));
app.use('/api/organisations', (req, res, next) => {
    // Check if the request is for the specific endpoint that should not be authenticated
    if (req.method === 'POST' && req.path === '/Org') {
      // If it's the public endpoint, skip the authentication
      next();
    } else {
      // For all other endpoints, use the authentication middleware
      authenticateJWT(req, res, next);
    }
  }, createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }));
app.use('/api/projects',authenticateJWT, createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true
}));
app.use('/api/employees',authenticateJWT, createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
}));
app.use('/api/clients',authenticateJWT, createProxyMiddleware({
    target: 'http://localhost:6000',
    changeOrigin: true
}));
app.listen(7000, () => {
    console.log('API Gateway running on port 7000');
});
