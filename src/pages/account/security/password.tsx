import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/redux/store';
import { ChangePasswordPayload } from '@/services/auth/auth.dto';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, ref, string } from 'yup';
import { resetStateChangePassword } from '@/redux/features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Input } from '@/components';

const schema = object({
  currentPassword: string()
    .required('This field is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  password: string()
    .required('This field is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  passwordConfirmation: string()
    .required('This field is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([ref('password')], 'Password does not match'),
});

export default function UserPassword() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordPayload>({ resolver: yupResolver(schema) });

  const { loading, isPasswordChanged, changePassword, error } = useAuth();

  const onSubmitHandler = (ChangePasswordData: ChangePasswordPayload) => {
    changePassword(ChangePasswordData);
  };

  useEffect(() => {
    if (isPasswordChanged) {
      reset();
      toast.success('Change password successfully!');
      dispatch(resetStateChangePassword());
    }
    if (error) {
      toast.error('Change password failed!');
    }
  }, [isPasswordChanged, reset, dispatch, error]);

  return (
    <div>
      <ToastContainer />
      <h1 className=" text-3xl mb-2">Change password</h1>
      <p>
        Change password for your account. You should use the strong password to prevent ilegal access for your account
      </p>
      <form className="my-4" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-4">
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span> Current password
          </span>
          <Input {...register('currentPassword')} type="password" />
          {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message}</span>}
          {error && <span className="text-red-500">Your password is invalid</span>}
        </div>

        <div className="mb-4">
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span> New password
          </span>
          <Input {...register('password')} type="password" />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <div className="mb-4">
          <span className="text-sm font-thin">
            <span className="text-red-500">*</span>Confirm new password
          </span>
          <Input {...register('passwordConfirmation')} type="password" />
          {errors.passwordConfirmation && <span className="text-red-500">{errors.passwordConfirmation.message}</span>}
        </div>

        <Button
          type="submit"
          variant="solid"
          loading={loading}
          disabled={loading}
          className="float-right ml-4 w-full lg:w-fit"
          aria-label="Confirm - Click to modified your password"
        >
          Confirm
        </Button>
        <Button
          type="button"
          variant="outlined"
          className="float-right w-full lg:w-fit my-2 lg:my-0"
          onClick={() => reset()}
          aria-label="Cancel"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

UserPassword.Layout = 'UserManagement';
