'use client';

import { ConfigProvider } from 'antd';
import React from 'react';

import 'antd/dist/reset.css';

export const AntdProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
