import CardDoctor from '@/components/ui/Card/CardDoctor'
import Header from '@/components/ui/Header'
import React from 'react'

export default function FindDoctor() {
    return (
        <>
            <Header/>
            <section className='m-3 min-h-screen ' >
                <CardDoctor/>
            </section>
        </>
    )
}
