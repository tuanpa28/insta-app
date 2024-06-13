// 'use client';

// import { IMedia } from '@/interfaces';
// import { postService } from '@/services';
// import { useCallback, useState } from 'react';
// import { toast } from 'react-toastify';

// const useUploadMedia = () => {
//   const [isLoading, setisLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const uploadMedias = useCallback(async (files: File[]) => {
//     let medias: IMedia[] = [];
//     const formData = new FormData();

//     if (files && files.length > 0) {
//       let hasImage = false;
//       let hasVideo = false;

//       for (const file of files) {
//         if (file.type.startsWith('image/')) {
//           hasImage = true;
//         } else if (file.type.startsWith('video/')) {
//           hasVideo = true;
//         } else {
//           toast.error('Loại file không được hỗ trợ!');
//         }
//       }

//       if (hasImage && !hasVideo) {
//         // Tất cả là ảnh, gọi API upload ảnh
//         for (let i = 0; i < files.length; i++) {
//           formData.append(`image`, files[i]);
//         }
//         try {
//           setisLoading(true);
//           const response = await postService.uploadImage(formData);
//           medias = response?.data;

//           setisLoading(false);
//         } catch (error: any) {
//           setError(error?.message);
//           setisLoading(false);
//           toast.error(error?.message);
//         }
//       } else if (!hasImage && hasVideo && files.length === 1) {
//         // Tất cả là video, gọi API khác cho video
//         formData.append('video', files[0]);
//         try {
//           setisLoading(true);
//           const response = await postService.uploadVideo(formData);

//           medias = response?.data;
//           setisLoading(false);
//         } catch (error: any) {
//           setError(error?.message);
//           setisLoading(false);
//           toast.error(error?.message);
//         }
//       } else {
//         toast.error('Chỉ cho phép tải ảnh hoặc 1 video!');
//       }
//     }
//     return medias;
//   }, []);

//   return { isLoading, error, uploadMedias };
// };

// export default useUploadMedia;
