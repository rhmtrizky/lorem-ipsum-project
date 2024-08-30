'use client';

import { useContext, useEffect, useState } from 'react';
import { ToasterContext } from '@/contexts/ToasterContext';
import verifyEmailService from '@/services/verify-email';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const VerifyEmail = () => {
  const { setToaster } = useContext(ToasterContext);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ verified: false, error: false });

  const searchParams = useSearchParams();
  const verifyToken = searchParams.get('verifyToken');
  const userId = searchParams.get('id');

  useEffect(() => {
    const verifyEmail = async () => {
      if (verifyToken || userId) {
        try {
          const res = await verifyEmailService.updateVerifyEmail(verifyToken, userId);
          if (res.status === 200 && res.data.status) {
            setStatus({ verified: true, error: false });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    verifyEmail();
  }, [verifyToken, userId, setToaster]);

  if (loading) {
    return <h1 className="flex justify-center items-center h-screen">Verifying your email address. Please wait...</h1>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md shadow-lg p-6 flex justify-center items-center">
        {status.verified && (
          <div className="mb-5 flex flex-col justify-center items-center gap-1">
            <p className="text-green-500">
              <FaCheckCircle size={40} />
            </p>
            <p>Your email has been verified successfully.</p>
            <Link href="/auth/login">
              <Button
                color="success"
                size="sm"
                className="bg-blue-500 rounded-md hover:bg-blue-700 text-white text-sm mt-2"
              >
                Go to Login
              </Button>
            </Link>
          </div>
        )}
        {status.error && (
          <div>
            <h1>Email Verification Failed!</h1>
            <p>Your verification token is invalid or has expired.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
