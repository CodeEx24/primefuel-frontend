'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/shared/schema/authSchema';
import { Form } from '../ui/form';
import { FormInputText } from '../defaults/FormInputText';
import { FormInputPassword } from '../defaults/FormInputPassword';
import { Button } from '../ui/button';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { AxiosError } from 'axios';
import { useRegisterMutation } from '@/pages/api/authApiSlice';

export default function RegisterForm() {
  const { showToast } = useCustomToast();

  const [register] = useRegisterMutation();

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      contact: '',
      username: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      //   const response = await axiosInstance.post(API_ENDPOINT.REGISTER, data);
      await register(data).unwrap();
      // dispatch(setCredentials({ ...userData }));
      // await axiosInstance.post(API_ENDPOINT.REGISTER, data);
      showToast(TOAST_TYPE.SUCCESS, 'User successfully register.');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (!error?.response) {
          showToast(TOAST_TYPE.ERROR, 'No server error response');
        } else if (error?.response) {
          showToast(TOAST_TYPE.ERROR, error?.response.data.message);
        } else {
          showToast(TOAST_TYPE.ERROR, 'An error occurred');
        }
      }
    }
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="w-full p-4"
      >
        <div className="w-full items-center space-y-2">
          <FormInputText
            control={registerForm.control}
            name="email"
            placeholder="Email"
          />
          <FormInputText
            control={registerForm.control}
            name="username"
            placeholder="Username"
          />
          <FormInputText
            control={registerForm.control}
            name="firstname"
            placeholder="First Name"
          />
          <FormInputText
            control={registerForm.control}
            name="lastname"
            placeholder="Last Name"
          />
          <FormInputText
            control={registerForm.control}
            name="contact"
            placeholder="Contact Number"
          />
          <FormInputPassword
            control={registerForm.control}
            name="password"
            placeholder="Password"
          />

          <Button className="w-full" type="submit">
            Create an Account
          </Button>
        </div>
      </form>
    </Form>
  );
}
