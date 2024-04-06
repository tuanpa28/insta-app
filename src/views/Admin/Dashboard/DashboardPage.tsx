import {
  UserSwitchOutlined,
  TransactionOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

const DashboardPage = () => {
  return (
    <>
      <div className={cx('head')}>
        <div>
          <h2 className={cx('title')}>Dashboard</h2>
          <p className={cx('intro')}>Welcome to your dashboard</p>
        </div>
        <Button type='primary' icon={<UploadOutlined />} size={'large'}>
          Download Reports
        </Button>
      </div>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#f2f0f0', height: 140 }}>
            <Statistic
              title='New Clients'
              value={8000}
              valueStyle={{ color: '#00b96b' }}
              prefix={<UserAddOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#f2f0f0', height: 140 }}>
            <Statistic
              title='Sales Obtained'
              value={450000}
              valueStyle={{ color: '#00b96b' }}
              prefix={<TransactionOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} style={{ background: '#f2f0f0', height: 140 }}>
            <Statistic
              title='Traffic Received'
              value={1438000}
              valueStyle={{ color: '#00b96b' }}
              prefix={<UserSwitchOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
