import Faq from "@/components/views/Home/Faq";
import Head from "next/head";
import React from "react";

export default function index() {
    return ( 
        <>
            <Head>
                <title>RS Harapan Bunda | FAQ</title>
            </Head>
            <Faq/>
        </>
    )
}