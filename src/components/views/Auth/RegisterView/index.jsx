import AuthLayout from '@/components/layouts/AuthLayout';
import Button from '@/components/ui/Button';
import InputUi from '@/components/ui/Input';
import authService from '@/services/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

const RegisterView = () => {
  const { push } = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    fullname: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phoneNumber: form.phoneNumber.value,
      password: form.password.value,
    };

    const dataConfirmPassword = form.confirmPassword.value;

    const formErrors = {
      email: !data.email ? 'Email is required' : '',
      fullname: !data.fullname ? 'Fullname is required' : '',
      phoneNumber: !data.phoneNumber ? 'Phone number is required' : '',
      password: !data.password ? 'Password is required' : '',
      confirmPassword: !dataConfirmPassword ? 'Confirm password is required' : '',
    };

    if (data.password !== dataConfirmPassword) {
      formErrors.confirmPassword = 'Password and confirm password do not match';
    }

    const hasErrors = Object.values(formErrors).some((error) => error);

    if (hasErrors) {
      setFormErrors(formErrors);
      setTimeout(() => {
        setFormErrors({
          email: '',
          fullname: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      }, 3000);

      setIsLoading(false);
      return;
    }

    try {
      const result = await authService.registerAccount(data);

      if (result.status == 200) {
        form.reset();
        push('/auth/login');
        setIsLoading(false);
      }
    } catch (error) {
      form.reset();
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Have an account?"
      linkTitle="Login"
      isError={isError}
      errorText="Email/Phone number already registered"
    >
      <div className="min-w-[320px]">
        <form
          className="flex flex-col gap-2"
          action=""
          onSubmit={handleSubmit}
        >
          <InputUi
            type="text"
            name="fullname"
            placeholder="Fullname"
            className={'input-auth text-white shadow-md rounded mt-2'}
          />
          {formErrors.fullname && <div className="text-color-red">{formErrors.fullname}</div>}

          <InputUi
            type="email"
            name="email"
            placeholder="Email"
            className={'input-auth text-white shadow-md rounded mt-2'}
          />
          {formErrors.email && <div className="text-color-red">{formErrors.email}</div>}
          <InputUi
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            className={'input-auth text-white shadow-md rounded mt-2'}
          />
          {formErrors.phoneNumber && <div className="text-color-red">{formErrors.phoneNumber}</div>}

          <InputUi
            type="password"
            name="password"
            placeholder="Password"
            className={'input-auth text-white shadow-md rounded mt-2'}
          />
          {formErrors.password && <div className="text-color-red">{formErrors.password}</div>}
          <InputUi
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={'input-auth text-white shadow-md rounded mt-2'}
          />
          {formErrors.confirmPassword && <div className="text-color-red">{formErrors.confirmPassword}</div>}

          <Button
            label={isLoading ? 'Loading...' : 'Register'}
            type="submit"
            className="bg-button-auth text-white py-2 px-1 rounded-md mt-5"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterView;
