import FeedbackView from '@/components/views/FeedbackView';
import Head from 'next/head';
import React from 'react';

export default function Feedback({ setToaster }) {
  return (
    <>
      <Head>
        <title>RS Harapan Bunda | Feedback</title>
      </Head>
      <FeedbackView setToaster={setToaster} />
    </>
  );
}
