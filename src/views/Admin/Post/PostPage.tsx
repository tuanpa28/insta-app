'use client';

import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import {  SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Skeleton, Space, Table, message } from 'antd';
// import { InputRef, Input } from 'antd';
// import { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
// import type { ColumnType } from 'antd/es/table';
// import Highlighter from 'react-highlight-words';
// import { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { useGetListPost } from '@/hooks';
import { IPost } from '@/interfaces';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

const PostPage = () => {
  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef<InputRef>(null);

  const { data, error, isLoading } = useGetListPost();

  if (error) return JSON.stringify(error);

  const confirm = (value: string) => {
    message.success(`Thành công! ${value}`);
  };

  const cancel = () => {
    message.error('Đã hủy!');
  };

  // const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: any) => {
  //     confirm();
  //     setSearchText(selectedKeys[0]);
  //     setSearchedColumn(dataIndex);
  // };

  // const handleReset = (clearFilters: () => void) => {
  //     clearFilters();
  //     setSearchText('');
  // };

  // const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
  //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
  //         <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
  //             <Input
  //                 ref={searchInput}
  //                 placeholder={`Search ${dataIndex}`}
  //                 value={selectedKeys[0]}
  //                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //                 onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
  //                 style={{ marginBottom: 8, display: 'block' }}
  //             />
  //             <Space>
  //                 <Button
  //                     type="primary"
  //                     onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
  //                     icon={<SearchOutlined />}
  //                     size="small"
  //                     style={{ width: 90 }}
  //                 >
  //                     Search
  //                 </Button>
  //                 <Button
  //                     onClick={() => clearFilters && handleReset(clearFilters)}
  //                     size="small"
  //                     style={{ width: 90 }}
  //                 >
  //                     Reset
  //                 </Button>
  //                 <Button
  //                     type="link"
  //                     size="small"
  //                     onClick={() => {
  //                         confirm({ closeDropdown: false });
  //                         setSearchText((selectedKeys as string[])[0]);
  //                         setSearchedColumn(dataIndex);
  //                     }}
  //                 >
  //                     Filter
  //                 </Button>
  //                 <Button
  //                     type="link"
  //                     size="small"
  //                     onClick={() => {
  //                         close();
  //                     }}
  //                 >
  //                     Close
  //                 </Button>
  //             </Space>
  //         </div>
  //     ),
  //     filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
  //     onFilter: (value, record) =>
  //         record[dataIndex]
  //             .toString()
  //             .toLowerCase()
  //             .includes((value as string).toLowerCase()),
  //     onFilterDropdownOpenChange: (visible) => {
  //         if (visible) {
  //             setTimeout(() => searchInput.current?.select(), 100);
  //         }
  //     },
  //     render: (text) =>
  //         searchedColumn === dataIndex ? (
  //             <Highlighter
  //                 highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //                 searchWords={[searchText]}
  //                 autoEscape
  //                 textToHighlight={text ? text.toString() : ''}
  //             />
  //         ) : (
  //             text
  //         ),
  // });

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
      title: 'User',
      dataIndex: 'user_id',
      key: 'user_id',
      width: 220,
      render: (text) => <span>{text?.full_name}</span>,
      sorter: {
        compare: (a, b) => a.user_id?.full_name.localeCompare(b.user_id?.full_name),
        // multiple: 2,
      },
      // ...getColumnSearchProps('user_id?.full_name'),
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Caption',
      dataIndex: 'caption',
      key: 'caption',
      width: 400,
      render: (text) => {
        return text.slice(0, 50).concat(' . . .');
      },
    },
    {
      title: 'Quantity Likes',
      dataIndex: 'likes',
      key: 'likes',
      width: 140,
      align: 'center',
      render: (text) => <span>{text.length}</span>,
      sorter: {
        compare: (a, b) => a.likes.length - b.likes.length,
        // multiple: 2,
      },
    },
    {
      title: 'Quantity Shares',
      dataIndex: 'shares',
      key: 'shares',
      width: 140,
      align: 'center',
      render: (text) => <span>{text.length}</span>,
      sorter: {
        compare: (a, b) => a.shares.length - b.shares.length,
        // multiple: 2,
      },
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
            title='Xóa bài viết?'
            description='Bạn có chắc chắn muốn xóa bài viết này không?'
            onConfirm={() => confirm(record.caption)}
            onCancel={cancel}
            okText='Yes'
            cancelText='Cancel'
          >
            <Button type='primary' danger>
              <DeleteOutlined />
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const newData = data.map((item: IPost, index: number) => ({
    ...item,
    key: index + 1,
  }));

  return (
    <>
      <div className={cx('head')}>
        <div>
          <h2 className={cx('title')}>Posts</h2>
          <p className={cx('intro')}>Manage posts</p>
        </div>
        <Button type='primary' icon={<PlusCircleOutlined />} size={'large'}>
          Create Post
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
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.caption}</p>,
          }}
        />
      ) : (
        <Skeleton active paragraph={{ rows: 4 }} />
      )}
    </>
  );
};

export default PostPage;
