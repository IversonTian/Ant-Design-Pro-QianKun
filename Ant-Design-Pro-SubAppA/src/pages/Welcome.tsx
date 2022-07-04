import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Card, } from 'antd';
import React from 'react';

const Welcome: React.FC = () => {
    const intl = useIntl();

    return (
        <PageContainer>
            <Card>
                {
                    intl.formatMessage({
                        id: 'pages.layouts.userLayout.title',
                        defaultMessage: 'Faster and stronger heavy-duty components have been released.',
                    })
                }
            </Card>
        </PageContainer>
    );
};

export default Welcome;
