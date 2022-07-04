import Footer from '@/components/Footer';
import { ConfigProvider } from 'antd';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/api';

const loginPath = '/user/login';
// !qiankun 微前端
let isMenu = true; // 设置一个变量,判断是否需要展示layout
// !qiankun 微前端

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
    // !qiankun 微前端
    const qianKunProp: any = {};
    // 如果是加载在主应用中,不展示菜单和头部
    if (!isMenu) {
        qianKunProp.menuRender = false;
        qianKunProp.headerRender = false;
        qianKunProp.contentStyle = { margin: 0 };
    }
    // !qiankun 微前端

    return {
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        waterMarkProps: {
            content: 'Smart Manager v3.0',
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录,重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        // !qiankun 微前端
        // childrenRender: (children: any) => {
        //     // 单独修改子应用主题颜色
        //     return (
        //         <>
        //             {!isMenu ? <ConfigProvider prefixCls="custom" iconPrefixCls="custom">{children}</ConfigProvider> : children}
        //         </>
        //     );
        // },
        // !qiankun 微前端
        links: [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // !qiankun 微前端
        ...qianKunProp,
        // !qiankun 微前端
        ...initialState?.settings,
    };
};

// !qiankun 微前端
// 子应用可以通过生命周期函数拿到主应用传递的参数
// 如果子应用本身是有菜单,面包屑等,应该要区别,在主应用不显示,否则会重复
export const qiankun = {
    // 应用加载之前
    async bootstrap(props: any) {
        console.log('subAppA bootstrap ==>', props);
        if (props) {
            isMenu = props.isMenu;
        }
    },
    // 应用 render 之前触发
    async mount(props: any) {
        console.log('subAppA mount ==>', props);
    },
    // 应用卸载之后触发
    async unmount(props: any) {
        console.log('subAppA unmount ==>', props);
    },
}
// !qiankun 微前端