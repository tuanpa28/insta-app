'use client';

import { LockOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Popconfirm, Skeleton, Space, Table, message } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
// import Highlighter from 'react-highlight-words';

import { useGetListUser } from '@/hooks';
import { IUser } from '@/interfaces';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

const UserPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const { data, error, isLoading } = useGetListUser();

  if (error) return JSON.stringify(error);

  const confirm = (value: string) => {
    message.success(`Thành công! ${value}`);
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: 40,
      align: 'center',
      sorter: {
        compare: (a, b) => a.key - b.key,
        // multiple: 2,
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      width: 140,
      sorter: {
        compare: (a, b) => a.username.localeCompare(b.username),
        multiple: 2,
      },
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      width: 200,
      sorter: {
        compare: (a, b) => a.full_name.localeCompare(b.full_name),
        // multiple: 2,
      },
      ...getColumnSearchProps('full_name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
        // multiple: 2,
      },
      ...getColumnSearchProps('email'),
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      width: 140,
      render: (text) => {
        return text.slice(0, 50).concat(' . . .');
      },
    },
    {
      title: 'Gender',
      key: 'gender',
      dataIndex: 'gender',
      width: 80,
      align: 'center',
      sorter: {
        compare: (a, b) => a.gender.localeCompare(b.gender),
        // multiple: 2,
      },
    },
    {
      title: 'City',
      dataIndex: 'current_city',
      key: 'current_city',
      width: 160,
      sorter: {
        compare: (a, b) => a.current_city.localeCompare(b.current_city),
        // multiple: 2,
      },
      ...getColumnSearchProps('current_city'),
    },
    {
      title: 'Access Level',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 100,
      align: 'center',
      render: (text) => <span className={cx('access-level')}>{text ? 'Admin' : 'User'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 110,
      align: 'center',
      render: (record) => (
        <Space size='middle'>
          <Popconfirm
            placement='topRight'
            title='Vô hiệu hóa người dùng?'
            description='Bạn có chắc chắn muốn vô hiệu hóa người dùng này không?'
            onConfirm={() => confirm(record.full_name)}
            onCancel={cancel}
            okText='Yes'
            cancelText='Cancel'
          >
            <Button type='primary' danger>
              <LockOutlined />
              Disable
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const newData = data?.map((item: IUser, index: number) => ({
    ...item,
    key: index + 1,
  }));

  return (
    <>
      <div className={cx('head')}>
        <div>
          <h2 className={cx('title')}>Users</h2>
          <p className={cx('intro')}>Manage accounts</p>
        </div>
        <Button type='primary' icon={<PlusCircleOutlined />} size={'large'}>
          Create Account
        </Button>
      </div>
      {!isLoading && data.length > 0 ? (
        <Table
          // pagination={{ pageSize: 8 }}
          size='middle'
          columns={columns}
          dataSource={newData}
          // rowSelection={{}}
          scroll={{ y: 450 }}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.bio}</p>,
          }}
        />
      ) : (
        <Skeleton active paragraph={{ rows: 4 }} />
      )}
    </>
  );
};

export default UserPage;
