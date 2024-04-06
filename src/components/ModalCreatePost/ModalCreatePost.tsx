'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BiArrowBack, BiXCircle } from 'react-icons/bi';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';

import { CloseIcon, ImageVideoIcon } from '@/components/Icons';
import { useCreatePost, useUploadMedia } from '@/hooks';
import styles from './ModalCreatePost.module.scss';

const cx = classNames.bind(styles);

interface IModalCreatePost {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ModalCreatePost = ({ onClick }: IModalCreatePost) => {
  const [activeStep, setActiveStep] = useState(0);
  const [caption, setCaption] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const { isLoading: loadingMedia, error: errMedia, uploadMedias } = useUploadMedia();
  const { isLoading: loadingPost, error: errPost, crearePost } = useCreatePost();

  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    const id = toast.loading('Đang đăng bài viết! Vui lòng đợi!', { position: 'top-center' });
    const media = await uploadMedias(files);
    await crearePost({ caption, media });
    onClick(event);
    toast.update(id, {
      render: 'Đăng bài viết thành công!',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });
  };

  if (errMedia) JSON.stringify(errMedia);
  if (errPost) JSON.stringify(errPost);

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

  const renderArrowPrev = (onClickHandler: any, hasPrev: boolean) => (
    <button
      type='button'
      onClick={onClickHandler}
      disabled={!hasPrev}
      className={cx('arrow-prev')}
      style={{
        display: `${hasPrev ? 'block' : 'none'}`,
      }}
    >
      <RiArrowLeftSLine className={cx('block')} />
    </button>
  );

  const renderArrowNext = (onClickHandler: any, hasNext: boolean) => (
    <button
      type='button'
      onClick={onClickHandler}
      disabled={!hasNext}
      className={cx('arrow-next')}
      style={{
        display: `${hasNext ? 'block' : 'none'}`,
      }}
    >
      <RiArrowRightSLine className={cx('block')} />
    </button>
  );

  const renderIndicator = (onClickHandler: any, isSelected: boolean, index: number) => (
    <li
      className={cx('indicator')}
      style={{
        background: isSelected ? 'rgb(0, 149, 246)' : 'rgb(168, 168, 168)',
      }}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
    />
  );

  useEffect(() => {
    return () => {
      setFiles([]);
      setActiveStep(0);
    };
  }, []);
  return (
    <div onClick={onClick} className={cx('wrapper')}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={cx('modal-container')}
        style={files && files.length > 0 && activeStep === 1 ? { width: 'auto' } : {}}
      >
        <div onClick={onClick} className={cx('modal-close')}>
          <CloseIcon />
        </div>
        <header className={cx('modal-header')}>
          {files && files.length > 0 && activeStep === 1 && (
            <div
              onClick={() => !!(!loadingMedia && !loadingPost) && handleBack()}
              className={cx('btn-back', { disable: !(!loadingMedia && !loadingPost) })}
            >
              <BiArrowBack className={cx('icon')} />
            </div>
          )}
          <p className={cx('title')}>Create new post</p>
          {files &&
            files.length > 0 &&
            (activeStep < 1 ? (
              <div onClick={handleNext} className={cx('btn-next')}>
                Next
              </div>
            ) : (
              <div
                onClick={(event) => !!(!loadingMedia && !loadingPost) && handleSubmit(event)}
                className={cx('btn-next', { disable: !(!loadingMedia && !loadingPost) })}
              >
                Share
              </div>
            ))}
        </header>
        <div className={cx('content')}>
          <div
            className={cx('sub-content')}
            style={
              files && files.length > 0 && activeStep === 1 ? { width: 'calc(100% - 316px)' } : {}
            }
          >
            {files && files.length > 0 ? (
              <Carousel
                showStatus={false}
                showThumbs={false}
                renderArrowPrev={renderArrowPrev}
                renderArrowNext={renderArrowNext}
                renderIndicator={renderIndicator}
              >
                {files?.map((file: File, index: number) => (
                  <div className={cx('img-item')} key={index}>
                    {file.type.startsWith('image/') ? (
                      <Image src={URL.createObjectURL(file)} alt='' />
                    ) : (
                      <video className={cx('video')} autoPlay>
                        <source src={URL.createObjectURL(file)} type={file.type} />
                      </video>
                    )}
                  </div>
                ))}
              </Carousel>
            ) : (
              <>
                <span className={cx('icon')}>
                  <ImageVideoIcon />
                </span>
                <p className={cx('text')}>Drag photos and videos here</p>
                <label htmlFor='file-upload' className={cx('btn-upload-file')}>
                  Select from computer
                </label>
                <input
                  id='file-upload'
                  type='file'
                  onChange={handleMediaChange}
                  accept='image/*, video/*'
                  multiple
                />
              </>
            )}
          </div>
          {files && files.length > 0 && activeStep === 1 && (
            <div className={cx('form')}>
              <textarea
                className={cx('input')}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder='Write a caption...'
              ></textarea>
            </div>
          )}

          {files && files.length > 0 && activeStep < 1 && (
            <div onClick={() => setFiles([])} className={cx('btn-delete')}>
              <BiXCircle className={cx('icon')} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCreatePost;
