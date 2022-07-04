/**
 * 在生产环境 代理是无法生效的,所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
    dev: {
        '/subAppA/api/': {
            target: 'http://localhost:9001',
            changeOrigin: true,
            pathRewrite: { '^/subAppA': '' },
        },
    },
    test: {
        '/api/': {
            target: 'https://proapi.azurewebsites.net',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
    },
    pre: {
        '/api/': {
            target: 'your pre url',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
    },
};