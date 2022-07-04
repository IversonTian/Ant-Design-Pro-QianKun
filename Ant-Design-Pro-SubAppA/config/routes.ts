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
    {
        name: 'ct',
        icon: 'audit',
        path: '/manager/ct',
        component: './CT',
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
