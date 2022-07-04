import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, } from 'antd';
import React from 'react';

const TableList: React.FC = () => {
    const intl = useIntl();

    return (
        <PageContainer>
            <Card>
                {
                    intl.formatMessage({
                        id: 'pages.layouts.userLayout.title',
                        defaultMessage: 'Enquiry form',
                    })
                }
                <p>客商管理</p>
            </Card>
        </PageContainer>
    );
};

export default TableList;