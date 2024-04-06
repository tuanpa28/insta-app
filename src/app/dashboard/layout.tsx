import {
  BarChartOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Menu, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { type PropsWithChildren } from 'react';
// import { theme } from 'antd';

import { PrivateAdminProvider } from '@/components/Providers';
import { noImage } from '@/public/images';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(<Link href={'/admin'}>Dashboard</Link>, '1', <BarChartOutlined />),
  // { type: 'divider' },

  getItem(
    'Data',
    'grp',
    null,
    [
      getItem(<Link href={'/admin/user'}>Manage Users</Link>, '2', <UserOutlined />),
      getItem(<Link href={'/admin/post'}>Manage Posts</Link>, '3', <FileTextOutlined />),
      getItem(<Link href={'/admin/comment'}>Manage Comments</Link>, '4', <SolutionOutlined />),
    ],
    'group',
  ),
];

export default async function layout({ children }: PropsWithChildren) {
  // const [collapsed, setCollapsed] = useState(false);
  const collapsed = true;
  // const {
  //     token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <PrivateAdminProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={240}
          style={{ backgroundColor: '#f2f0f0' }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            style={{
              textAlign: 'center',
              margin: `${collapsed ? '20px 0 16px' : '26px 0 22px'}`,
            }}
          >
            <Image
              src={noImage}
              alt='Avatar'
              style={{
                maxWidth: `${collapsed ? '70%' : '44%'}`,
                borderRadius: '50%',
                marginBottom: 2,
              }}
            />
            <p
              style={{
                fontSize: `${collapsed ? '16px' : '24px'}`,
                fontWeight: 700,
                marginBottom: 0,
              }}
            >
              Pham Tuan
            </p>
            <p
              style={{
                fontSize: `${collapsed ? '14px' : '16px'}`,
                fontWeight: 400,
                marginBottom: 0,
                color: '#00b96b',
              }}
            >
              Admin
            </p>
          </div>
          <Menu
            theme='light'
            style={{ background: '#f2f0f0', border: 'none' }}
            mode='inline'
            defaultSelectedKeys={['1']}
            items={items}
          />
        </Sider>
        <Layout style={{ background: '#fcfcfc' }}>
          <Header style={{ background: '#fcfcfc' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Button
                  type='text'
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  // onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 46,
                    height: 46,
                    marginRight: 28,
                  }}
                />
                <Search placeholder='Search . . .' size='large' allowClear style={{ width: 260 }} />
              </div>
              <div style={{ marginRight: 36 }}>
                <Avatar
                  style={{
                    backgroundColor: 'transparent',
                    color: '#1d1d1d',
                    cursor: 'pointer',
                    transform: 'translateY(-10%)',
                  }}
                  size={40}
                  icon={<UserOutlined />}
                />
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: '0 16px',
              padding: 16,
              // background: '#f2f0f0',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </PrivateAdminProvider>
  );
}
