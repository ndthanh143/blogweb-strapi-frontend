import { getMe } from '@/redux/features/auth/authSlice';
import { resetState, updateUser } from '@/redux/features/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { UpdateUserPayload } from '@/services/user/users.dto';
import { getStrapiMedia } from '@/utils/media';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { mixed, object, string } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, Button, Input } from '@/components';

const schema = object({
  avatar: mixed(),
  about: string(),
  name: string().required('This field is required'),
  major: string(),
});

export default function Personal() {
  const { user } = useAuth({});

  const dispatch = useAppDispatch();

  const { data, isUpdated } = useAppSelector((state) => state.userDetail);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserPayload>({ resolver: yupResolver(schema) });

  const onSubmitHandler = (payload: UpdateUserPayload) => {
    if (user) {
      dispatch(updateUser({ user, payload }));
    }
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(resetState());
      toast.success('Update successfully!');
      dispatch(getMe());
    }
  }, [dispatch, data, isUpdated]);

  return (
    user && (
      <div>
        <ToastContainer />
        <h1 className=" text-3xl mb-2">Personal Info</h1>
        <p>Manage your personal info. </p>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="my-8 flex justify-center">
            <Avatar
              isPicker
              src={user.avatar && getStrapiMedia(user.avatar.formats.thumbnail)}
              width={100}
              height={100}
              alt={(user.avatar && user.avatar.alternativeText) || ''}
              onChange={(data) => setValue('avatar', data)}
              size={(user.avatar && user.avatar.formats.small + '') || ''}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 col-span-2">
              <span className="text-sm font-thin">Username</span>
              <Input disabled value={user.username} />
            </div>
            <div className="mb-4 col-span-2 lg:col-span-1">
              <span className="text-sm font-thin">
                <span className="text-red-500">*</span> Display Name
              </span>
              <Input {...register('name')} defaultValue={user.name} />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="mb-4 col-span-2 lg:col-span-1">
              <span className="text-sm font-thin">Major</span>
              <Input {...register('major')} defaultValue={user.major} />
            </div>
            <div className="mb-4 col-span-2">
              <span className="text-sm font-thin">About you</span>
              <Input {...register('about')} defaultValue={user.about} />
            </div>
          </div>
          <Button
            type="submit"
            variant="solid"
            className="float-right ml-4 w-full lg:w-fit"
            aria-label="Submit - Click to submit your changes"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="outlined"
            className="float-right w-full my-2 lg:my-0 lg:w-fit"
            onClick={() => reset()}
          >
            Cancel
          </Button>
        </form>
      </div>
    )
  );
}

Personal.Layout = 'UserManagement';
