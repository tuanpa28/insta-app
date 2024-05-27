import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

export default async function layout({ children }: { children: React.ReactNode }) {
  // const [fullMain, setFullMain] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <main className={cx('main', { fullMain: false })}>
        <div className={cx('content')}>
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
