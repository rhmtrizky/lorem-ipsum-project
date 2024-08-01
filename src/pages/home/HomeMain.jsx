import Header from '../../components/ui/Header'
import React from 'react'
import HomeBanner from './HomeBanner'
import HomePoli from './HomePoli'

export default function HomeMain() {
  return (
    <>
        <Header/>
        <section className='w-full h-fit border-y-2 ' >
            <div>
                <HomeBanner/>
            </div>
        </section>
        <section className='m-12' >
          <HomePoli/>
        </section>
    </>
  )
}
