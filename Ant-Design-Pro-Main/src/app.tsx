import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import entryUrl from '../config/entryUrl';
import { currentUser as queryCurrentUser } from './services/api';
const { REACT_APP_ENV } = process.env;
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.CurrentUser;
    loading?: boolean;
    fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
    const fetchUserInfo = async () => {
        try {
            const msg = await queryCurrentUser();
            return msg.data;
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    // 如果不是登录页面,执行
    if (history.location.pathname !== loginPath) {
        const currentUser = await fetchUserInfo();
        return {
            fetchUserInfo,
            currentUser,
            settings: defaultSettings,
        };
    }
    return {
        fetchUserInfo,
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        waterMarkProps: {
            content: 'Smart v3.0',
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录,重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        links: [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        ...initialState?.settings,
    };
};

// !qiankun 微前端
// 从接口中获取子应用配置,export出的qiankun变量是一个promise
export const qiankun = fetch('/config').then(({ apps }: any) => ({
    // 注册子应用信息
    apps: [
        {
            name: 'subAppA',
            // entry: entryUrl[REACT_APP_ENV || 'dev'],
            entry: '//localhost:9001',
            props: {
                isMenu: false,
                qianKunProps: {
                    appName: 'Ant-Design-Pro-Main'
                }
            }
        }
    ],
    // 完整生命周期钩子请看 https://qiankun.umijs.org/zh/api/#registermicroapps-apps-lifecycles
    lifeCycles: {
        afterMount: (props: any) => {
            console.log('Ant-Design-Pro-Main afterMount props ==>', props);
        }
    },
    // 支持更多的其他配置，详细看这里 https://qiankun.umijs.org/zh/api/#start-opts
}))
// !qiankun 微前端

// export const qiankun = () => ({
//     apps: [
//         {
//             name: 'subAppA',
//             entry: '//localhost:9001',
//             props: {
//                 isMenu: false,
//                 qianKunProps: {
//                     appName: 'Ant-Design-Pro-Main'
//                 }
//             },
//         }
//     ],
//     lifeCycles: {
//         afterMount: (props: any) => {
//             console.log('Ant-Design-Pro-Main afterMount props ==>', props);
//         }
//     },
// })