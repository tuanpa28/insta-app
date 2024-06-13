'use client';

import { CircleXIcon, SquareChevronLeftIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ImageVideoIcon } from '@/components/Icons';
// import { useCreatePost, useUploadMedia } from '@/hooks';

type ModalCreatePostProps = {
  onToogle: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const ModalCreatePost = ({ onToogle }: ModalCreatePostProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [caption, setCaption] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  // const { isLoading: loadingMedia, error: errMedia, uploadMedias } = useUploadMedia();
  // const { isLoading: loadingPost, error: errPost, crearePost } = useCreatePost();

  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    const id = toast.loading('Đang đăng bài viết! Vui lòng đợi!', { position: 'top-center' });
    // const media = await uploadMedias(files);
    // await crearePost({ caption, media });
    onToogle(event);
    toast.update(id, {
      render: 'Đăng bài viết thành công!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
  };

  // if (errMedia) JSON.stringify(errMedia);
  // if (errPost) JSON.stringify(errPost);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      let hasImage = false;
      let hasVideo = false;

      for (const file of Array.from(files)) {
        const fileSizeInKB = file.size / 1024;
        const maxSizeInKB = 4200;
        if (fileSizeInKB > maxSizeInKB) {
          toast.warning('Vui lòng chọn file dưới 4.2MB!');
        } else {
          if (file.type.startsWith('image/')) {
            hasImage = true;
          } else if (file.type.startsWith('video/')) {
            hasVideo = true;
          } else {
            toast.error('Loại file không được hỗ trợ!');
          }
        }
      }
      if (hasImage && hasVideo) {
        toast.error('Vui lòng upload ảnh hoặc video!');
      } else if (!hasImage && hasVideo && files.length !== 1) {
        toast.error('Vui lòng upload 1 video!');
      } else {
        setFiles(Array.from(files));
      }
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    return () => {
      setFiles([]);
      setActiveStep(0);
    };
  }, []);

  return (
    <div
      onClick={onToogle}
      className={'fixed inset-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center z-[1000] '}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={
          'max-h-[898px] max-w-[855px] min-h-[391px] min-w-[348px] w-[539px] bg-white rounded-xl'
        }
        style={files && files.length > 0 && activeStep === 1 ? { width: 'auto' } : {}}
      >
        <div
          onClick={onToogle}
          className={'absolute top-2.5 right-2.5 p-2 text-[#fff] cursor-pointer'}
        >
          <XIcon />
        </div>
        <header
          className={'border-b border-solid border-[rgb(219,219,219)] flex h-11 w-full relative'}
        >
          {files && files.length > 0 && activeStep === 1 && (
            <div
              // onClick={() => !!(!loadingMedia && !loadingPost) && handleBack()}
              // className={`absolute top-0 left-0 py-3 px-4 h-full text-xl font-bold ${
              /////   !(!loadingMedia && !loadingPost) && '!text-[#3a3937] !opacity-30 cursor-no-drop'
              // }`}
            >
              <SquareChevronLeftIcon />
            </div>
          )}
          <p
            className={
              'flex items-center text-primary flex-grow text-base font-bold justify-center m-0'
            }
          >
            Create new post
          </p>
          {files &&
            files.length > 0 &&
            (activeStep < 1 ? (
              <div
                onClick={handleNext}
                className={
                  'absolute top-0 right-0 p-4 h-full text-[rgb(0,149,246)] font-bold text-sm cursor-pointer hover:text-[rgb(0,55,107)]'
                }
              >
                Next
              </div>
            ) : (
              <div
                // onClick={(event) => !!(!loadingMedia && !loadingPost) && handleSubmit(event)}
                className={
                  'absolute top-0 right-0 p-4 h-full text-[rgb(0,149,246)] font-bold text-sm cursor-pointer hover:text-[rgb(0,55,107)]'
                }
              >
                Share
              </div>
            ))}
        </header>
        <div
          className={
            'flex items-center justify-center p-6 min-h-[400px] relative transition-all ease-in-out duration-300'
          }
        >
          <div
            className={'flex items-center justify-center flex-col'}
            style={
              files && files.length > 0 && activeStep === 1 ? { width: 'calc(100% - 316px)' } : {}
            }
          >
            {files && files.length > 0 ? (
              // <Carousel
              //   showStatus={false}
              //   showThumbs={false}
              //   renderArrowPrev={renderArrowPrev}
              //   renderArrowNext={renderArrowNext}
              //   renderIndicator={renderIndicator}
              // >
              //   {files?.map((file: File, index: number) => (
              //     <div className={cx('img-item')} key={index}>
              //       {file.type.startsWith('image/') ? (
              //         <Image src={URL.createObjectURL(file)} alt='' />
              //       ) : (
              //         <video className={cx('video')} autoPlay>
              //           <source src={URL.createObjectURL(file)} type={file.type} />
              //         </video>
              //       )}
              //     </div>
              //   ))}
              // </Carousel>
              <></>
            ) : (
              <>
                <span>
                  <ImageVideoIcon />
                </span>
                <p className={'text-xl text-center font-normal text-primary mb-4'}>
                  Drag photos and videos here
                </p>
                <label
                  htmlFor='file-upload'
                  className={
                    'bg-[rgb(0,149,246)] rounded-lg text-[#fff] cursor-pointer block text-sm font-semibold py-2 px-4 h-8 hover:bg-[rgb(24,119,242)]'
                  }
                >
                  Select from computer
                </label>
                <input
                  id='file-upload'
                  type='file'
                  onChange={handleMediaChange}
                  accept='image/*, video/*'
                  multiple
                  className='hidden'
                />
              </>
            )}
          </div>
          {files && files.length > 0 && activeStep === 1 && (
            <div className={'w-[316px] h-[240px] pl-6'}>
              <textarea
                className={
                  'py-2 w-full h-full outline-none border-none resize-none text-base text-primary placeholder:text-base placeholder:font-normal placeholder:text-[#c7c7c7]'
                }
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder='Write a caption...'
              ></textarea>
            </div>
          )}

          {files && files.length > 0 && activeStep < 1 && (
            <div
              onClick={() => setFiles([])}
              className={
                'absolute left-4 bottom-3.5 text-3xl cursor-pointer text-[#3a3937] hover:text-[#5f5d58]'
              }
            >
              <CircleXIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
