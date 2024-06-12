'use client';

import { ChevronLeftIcon, ChevronRightIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import Image from 'next/image';
import { LegacyRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { TypeMedia } from '@/constants/enum';
import { IMedia } from '@/interfaces';

interface ICarouselProps {
  medias: IMedia[];
  videoRef: LegacyRef<HTMLVideoElement> | null;
  onTogglePlay: () => void;
  isPlay: boolean;
  onToggleVolume: () => void;
  isVolume: boolean;
}

const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className='w-full flex justify-between absolute z-10 left-0 top-[50%] px-2'>
      <button
        className='flex items-center justify-center transition-all ease-in-out duration-200 text-3xl text-red-500 rounded-[14px] translate-y-[-50%] p-2 hover:bg-[rgba(0,0,0,0.2)]'
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon />
      </button>

      <button
        className='flex items-center justify-center transition-all ease-in-out duration-200 text-3xl text-red-500 rounded-[14px] translate-y-[-50%] p-2 hover:bg-[rgba(0,0,0,0.2)]'
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

const SwiperCarousel = ({
  medias,
  videoRef,
  onTogglePlay,
  isPlay,
  onToggleVolume,
  isVolume,
}: ICarouselProps) => {
  return (
    <Swiper
      speed={300}
      pagination={{
        clickable: true,
      }}
      loop={true}
      modules={[Pagination, Navigation]}
      className='flex items-center justify-center w-full h-full'
    >
      {medias?.map((item: IMedia, i) => (
        <SwiperSlide key={i}>
          <div className='w-full h-full relative z-[1]'>
            {item.type === TypeMedia.Image ? (
              <Image
                className='block w-full h-full object-contain'
                src={item.url}
                width={800}
                height={800}
                alt=''
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  loop
                  muted
                  className='w-full h-full object-contain overflow-clip'
                >
                  <source src={item.url} type='video/mp4' />
                </video>
                <div
                  onClick={onTogglePlay}
                  className='absolute inset-0 z-40 flex items-center justify-center'
                >
                  {!isPlay && (
                    <div className="bg-[url('/icons/icons2.png')] bg-no-repeat bg-[0_0] w-[135px] h-[135px]"></div>
                  )}
                </div>
                <div
                  onClick={onToggleVolume}
                  className='absolute right-0 bottom-0 p-2 mb-4 mr-4 rounded-[50%] text-white bg-[rgb(38,38,38)] z-50'
                >
                  {isVolume ? (
                    <Volume2Icon width={18} height={18} />
                  ) : (
                    <VolumeXIcon width={18} height={18} />
                  )}
                </div>
              </>
            )}
          </div>
        </SwiperSlide>
      ))}
      {medias?.length > 1 && <SwiperNavButtons />}
    </Swiper>
  );
};

export default SwiperCarousel;
