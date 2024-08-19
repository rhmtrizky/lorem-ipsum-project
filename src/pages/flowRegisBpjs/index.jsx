import FlowRegisBpjs from '@/components/views/Home/FlowRegisBpjsView'
import Head from 'next/head'
import React from 'react'

export default function index() {
    return ( 
        <>
            <Head>
                <title>RS Harapan Bunda | Flow Register BPJS</title>
            </Head>
            <FlowRegisBpjs/>
        </>
    )
}
