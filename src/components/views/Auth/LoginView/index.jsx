import Button from '@/components/ui/Button';
import InputUi from '@/components/ui/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GoogleIcon from '../../../../../public/googleIcon.png';
import AuthLayout from '@/components/layouts/AuthLayout';

const LoginView = () => {
  const { push, query } = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const callbackUrl = query.callbackUrl || '/';
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email.value,
      password: form.password.value,
      callbackUrl,
    });

    if (!form.email.value || !form.password.value) {
      setFormErrors({
        email: !form.email.value ? 'Email is required' : '',
        password: !form.password.value ? 'Password is required' : '',
      });
      setTimeout(() => {
        setFormErrors({
          email: '',
          password: '',
        });
      }, 3000);
      setIsLoading(false);
      return;
    }
    if (!res?.error) {
      push(callbackUrl);
      setIsLoading(false);
      form.reset();
    } else {
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account?"
      linkTitle="Create an account"
      isError={isError}
      errorText="Invalid email or password"
      subChildren={
        <>
          <div className="flex justify-center items-center gap-2 w-[75%]">
            <div className="text-neutral-500 h-0.5 w-full bg-neutral-300 w-[200px]" />
            <p className="italic text-sm pb-1">or</p>
            <div className="text-neutral-500 h-0.5 w-full bg-neutral-300" />
          </div>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Button
              type="button"
              className=" flex justify-center items-center bg-white text-color-dark py-2 px-3 rounded-md"
              onClick={() => signIn('google', { callbackUrl: '/', redirect: false })}
              icon={GoogleIcon}
              label={'Login with Google'}
            />
          </div>
        </>
      }
    >
      <div className="lg:min-w-[320px] md:min-w-[320px] sm:w-[290px] w-[290px]">
        <form
          className="flex flex-col gap-2"
          action=""
          onSubmit={handleSubmit}
        >
          <InputUi
            type="email"
            name="email"
            placeholder="Email"
            className={'input-auth text-white shadow-md rounded mt-2'}
            required={true}
          />
          {formErrors.email && <div className="text-color-red">{formErrors.email}</div>}
          <InputUi
            type="password"
            name="password"
            placeholder="Password"
            className={'input-auth text-white shadow-md rounded mt-2'}
            required={true}
          />
          {formErrors.password && <div className="text-color-red">{formErrors.password}</div>}
          <Button
            label={isLoading ? 'Loading...' : 'Sign In'}
            type="submit"
            className="bg-button-auth font-semibold text-white py-2 px-1 rounded-md mt-5"
          />
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
