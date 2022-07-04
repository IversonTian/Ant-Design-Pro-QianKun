export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: './User/Login',
            },
            {
                component: './404',
            },
        ],
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
    },
    // !qiankun 微前端
    // {
    //     path: '/manager/ct',           // 路由地址(与子应用路由地址一致)
    //     name: 'manager.ct',            // 自定义
    //     microApp: 'subAppA',           // app.tsx定义的name
    //     microAppProps: {
    //         base: '',                  // 路由传空(可以直接跳转到对应路由页,不会重定向到首页)
    //     },
    // },
    {
        path: '/manager',
        name: 'manager',
        icon: 'audit',
        access: 'canAdmin',
        routes: [
            {
                path: '/manager/ct',          // 路由地址(与子应用路由地址一致)
                name: 'ct',                   // 自定义
                microApp: 'subAppA',          // app.tsx定义的name
                microAppProps: {
                    base: '',                 // 路由传空(可以直接跳转到对应路由页,不会重定向到首页)
                },
            },
            {
                component: './404',
            },
        ],
    },
    // !qiankun 微前端
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        component: './404',
    },
];
