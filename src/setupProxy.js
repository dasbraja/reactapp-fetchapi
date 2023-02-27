const { createProxyMiddleware } = require('http-proxy-middleware');
const Host = {
    PROD: 'https://sirendev.westus.cloudapp.azure.com/',
    STAGING: 'https://sirendev.westus.cloudapp.azure.com/',
    DEV: 'https://sirendev.westus.cloudapp.azure.com/',
    LOCAL: '',
};
const pathRewrite = process.env.PROXY_TARGET ? {} : {
    '^/api/v1': '',
};
module.exports = function (app) {
    app.use(
        '/api/v1',
        createProxyMiddleware({
            logLevel: 'debug',
            target: `${process.env.PROXY_TARGET ? Host[process.env.PROXY_TARGET] : 'http://127.0.0.1:8008'}`,
            changeOrigin: true,
            pathRewrite: pathRewrite,
            router: async function (proxyRequest, path, req) {
                proxyRequest.headers = {
                    ...proxyRequest.headers
                };
            },
        }),
    );
};