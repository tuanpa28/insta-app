import { GridLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      {typeof window !== 'undefined' ? <GridLoader color='#ee4949' size={50} /> : 'Loading...'}
    </div>
  );
};

export default LoadingPage;
