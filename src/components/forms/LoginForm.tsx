import { Form } from '../ui/form';
import { FormInputText } from '../defaults/forms/FormInputText';
import { FormInputPassword } from '../defaults/forms/FormInputPassword';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/shared/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ROUTES } from '@/shared/constants/ROUTES';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { useDispatch } from 'react-redux';
import { ROLES } from '@/shared/constants/ROLES';
import { setCredentials } from '@/shared/lib/features/authSlice';
import { useLoginMutation } from '@/pages/api/authApiSlice';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { ErrorResponse } from '@/shared/interface/ErrorType';

export default function LoginForm() {
  const { showToast } = useCustomToast();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const userData = await login(data).unwrap();
      dispatch(setCredentials({ ...userData }));
      if (userData.user.roles.includes(ROLES.InternalUser)) {
        navigate('/admin/dashboard');
      }
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(TOAST_TYPE.ERROR, 'No server error response');
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, 'Missing email or password!');
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, 'Unauthorized');
      } else {
        showToast(TOAST_TYPE.ERROR, 'Login Failed');
      }
    }
  };

  return (
    <>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <FormInputText
              control={loginForm.control}
              name="email"
              placeholder="Your email"
            />

            <FormInputPassword
              control={loginForm.control}
              name="password"
              placeholder="Your password"
            />

            <div className="flex justify-between items-center ">
              <Link
                to={ROUTES.AUTH.FORGOT_PASSWORD}
                className="font-semibold text-sm text-right w-full"
              >
                Forgot Password
              </Link>
            </div>
            <Button type="submit">{isLoading ? 'Loading...' : `Log In`}</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
