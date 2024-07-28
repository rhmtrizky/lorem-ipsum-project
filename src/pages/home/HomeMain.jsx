import Header from '../../components/ui/Header'
import React from 'react'
import HomeBanner from './HomeBanner'

export default function HomeMain() {
  return (
    <>
        <Header/>
        <section className='w-full h-ft border-y-2 ' >
            <div>
                <HomeBanner/>
            </div>
        </section>
    </>
  )
}
