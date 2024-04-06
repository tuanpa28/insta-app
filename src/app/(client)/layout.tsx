import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

export default async function layout({ children }: { children: React.ReactNode }) {
  // const [fullMain, setFullMain] = useState(false);

  const setFullMain = () => {};

  return (
    <div className={cx('wrapper')}>
      <Sidebar handleFullMain={setFullMain} />
      <main className={cx('main', { fullMain: false })}>
        <div className={cx('content')}>
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}
