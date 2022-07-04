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
        // !qiankun 微前端
        // 因为在主应用,请求的地址是主应用的,要代理回子应用的请求地址
        // 如果已经有类似/api这种前缀,要注意主应用和子应用区分,不要用相同的前缀
        // http://www.cppcns.com/wangluo/javascript/465532.html
        '/main/api/': {
            target: 'http://localhost:9000',
            changeOrigin: true,
            pathRewrite: { '^/main': '' },
        },
        '/subAppA/api/': {
            target: 'http://localhost:9001',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
        // !qiankun 微前端
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
