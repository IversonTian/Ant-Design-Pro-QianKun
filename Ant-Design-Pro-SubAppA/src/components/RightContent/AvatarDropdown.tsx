import { outLogin } from '@/services/api';
import { LoadingOutlined, LogoutOutlined, FormOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, message, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
    menu?: boolean;
};

/**
 * 退出登录,并且将当前的 url 保存
 */
const loginOut = async () => {
    await outLogin();
    const { search, pathname } = history.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
            pathname: '/user/login',
            search: stringify({
                redirect: pathname + search,
            }),
        });
    }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
    const { initialState, setInitialState } = useModel('@@initialState');

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const { key } = event;
            if (key === 'LOGOUT') {
                // !重置数据(InitialState + sessionStorage)
                setInitialState((s) => ({ ...s, currentUser: undefined }));
                sessionStorage.clear();
                loginOut();
                return;
            }
            if (key === 'CHANGEPASSWORD') {
                message.info('修改密码');
            }
        },
        [setInitialState],
    );

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
            <Spin
                size="small"
                style={{ marginLeft: 8, marginRight: 8, }}
                // 注:因为全局的Loading会比较不协调,所以用一个小图标代替
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { currentUser } = initialState;

    if (!currentUser || !currentUser.name) {
        return loading;
    }

    const menuItems: ItemType[] = [
        {
            key: 'CHANGEPASSWORD',
            icon: <FormOutlined />,
            label: '修改密码',
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'LOGOUT',
            icon: <LogoutOutlined />,
            label: '退出登录',
        },
    ];

    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
    );

    return (
        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}  ${styles.headerDropdown}`}>
                <Avatar src='https://joeschmoe.io/api/v1/random' className={styles.avatar} />
                <span className={`${styles.name} anticon`}>{currentUser.name}</span>
            </span>
        </HeaderDropdown>
    );
};

export default AvatarDropdown;
