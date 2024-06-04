import NotifiItem from './NotifiItem';

const Notifications = () => {
  return (
    <div className='flex flex-col absolute z-[-1] top-0 left-[calc(var(--nav-narrow-width)+1px)] w-[397px] h-screen py-2 overflow-y-hidden bg-white shadow-[rgba(0,0,0,0.15)] drop-shadow-xl border-r border-solid border-border rounded-r-2xl transition-transform ease-in-out duration-500 translate-x-[calc(-100%-var(--nav-narrow-width)+1px)] translate-x-0'>
      <div className='my-2 px-6 py-1'>
        <span className='block text-primary font-bold text-2xl'>Notifications</span>
      </div>
      <div className='overflow-y-auto '>
        <div className='mb-2'>
          <span className='block text-base font-bold mb-1 px-6'>Today</span>
          <div className='flex flex-col'>
            <NotifiItem />
          </div>
        </div>
        <span className='block w-full h-[1px] bg-border mb-3'></span>
        <div className='mb-2'>
          <span className='block text-base font-bold mb-1 px-6'>This week</span>
          <div className='flex flex-col'>
            <NotifiItem />
            <NotifiItem />
            <NotifiItem />
          </div>
        </div>
        <span className='block w-full h-[1px] bg-border mb-3'></span>
        <div className='mb-2'>
          <span className='block text-base font-bold mb-1 px-6'>This month</span>
          <div className='flex flex-col'>
            <NotifiItem />
            <NotifiItem />
            <NotifiItem />
          </div>
        </div>
        <span className='block w-full h-[1px] bg-border mb-3'></span>
        <div className='mb-2'>
          <span className='block text-base font-bold mb-1 px-6'>Earlier</span>
          <div className='flex flex-col'>
            <NotifiItem />
            <NotifiItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
