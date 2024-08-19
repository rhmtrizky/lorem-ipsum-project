import RegisterView from '@/components/views/Auth/RegisterView';
import Head from 'next/head';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>RS Harapan Bunda - Register</title>
      </Head>
      <RegisterView />;
    </>
  )
};

export default RegisterPage;
