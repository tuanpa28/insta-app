'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { userService } from '@/services';
import { actions, useStore } from '@/store';
import { editProfileSchema } from '@/validates';

const EditProfilePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, dispatch] = useStore();

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: state?.user?.username,
      email: state?.user?.email,
      full_name: state?.user?.full_name,
      bio: state?.user?.bio,
      date_of_birth: !state?.user?.date_of_birth ? undefined : state?.user?.date_of_birth,
      gender: state?.user?.gender,
      current_city: state?.user?.current_city,
      from: state?.user?.from,
    },
  });

  const handleSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    const dataUpdate = {
      ...values,
      date_of_birth: values.date_of_birth === undefined ? null : values.date_of_birth,
    };
    setIsLoading(true);
    try {
      await userService.updateUser(state?.user?._id as string, dataUpdate);
      dispatch(actions.editUser(dataUpdate));
      toast.success('Sửa thông tin thành công!');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || 'Sửa thông tin thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen pt-10 w-full max-w-[600px] mx-auto'>
      <div className='mb-4'>
        <span className='text-2xl font-medium text-[rgb(0,0,0)]'>Edit Profile</span>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập User Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Họ & Tên</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập Họ & Tên' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu sử</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Nhập Tiểu sử' className='max-h-48' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='date_of_birth'
                render={({ field }) => (
                  <FormItem className='flex flex-col justify-end w-full'>
                    <FormLabel>Ngày sinh</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal !mt-3',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Chọn ngày sinh</span>}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Giới tính</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn giới tính' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='male'>Nam</SelectItem>
                        <SelectItem value='female'>Nữ</SelectItem>
                        <SelectItem value='other'>Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center gap-4'>
              <FormField
                control={form.control}
                name='from'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Đến từ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn thành phố' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Hà Nội'>Hà Nội</SelectItem>
                        <SelectItem value='Tuyên Quang'>Tuyên Quang</SelectItem>
                        <SelectItem value='Hà giang'>Hà giang</SelectItem>
                        <SelectItem value='Thái Binh'>Thái Binh</SelectItem>
                        <SelectItem value='Nam Định'>Nam Định</SelectItem>
                        <SelectItem value='Yên Bái'>Yên Bái</SelectItem>
                        <SelectItem value='Bắc Ninh'>Bắc Ninh</SelectItem>
                        <SelectItem value='Hải Phòng'>Hải Phòng</SelectItem>
                        <SelectItem value='Ninh Bình'>Ninh Bình</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='current_city'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Thành phố hiện tại</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn thành phố' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Hà Nội'>Hà Nội</SelectItem>
                        <SelectItem value='Tuyên Quang'>Tuyên Quang</SelectItem>
                        <SelectItem value='Hà giang'>Hà giang</SelectItem>
                        <SelectItem value='Thái Binh'>Thái Binh</SelectItem>
                        <SelectItem value='Nam Định'>Nam Định</SelectItem>
                        <SelectItem value='Yên Bái'>Yên Bái</SelectItem>
                        <SelectItem value='Bắc Ninh'>Bắc Ninh</SelectItem>
                        <SelectItem value='Hải Phòng'>Hải Phòng</SelectItem>
                        <SelectItem value='Ninh Bình'>Ninh Bình</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' disabled={isLoading} className='!mt-8'>
              {isLoading ? <LoaderCircleIcon className='w-6 h-6 animate-spinner' /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfilePage;
