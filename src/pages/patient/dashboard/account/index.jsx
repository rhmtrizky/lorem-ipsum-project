import AccountView from '@/components/views/Patient/Dashboard/AccountView'
import Head from 'next/head'
import React from 'react'

export default function account() {
    return (
        <>
            <Head>
                <title>RS Harapan Bunda | Patient Account</title>
            </Head>
            <AccountView/>
        </>
    )
}
