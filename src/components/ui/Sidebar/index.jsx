import { framerRollBack, framerSidebarBackground, framerSidebarPanel, framerText } from './framer'
import { useRef, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import { AiOutlineRollback } from 'react-icons/ai'
import { logo } from '@/assets/images/images'
import { items } from '@/util/datas'
import Image from 'next/image'

export const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => setOpen(false))
  const toggleSidebar = () => setOpen(prev => !prev)

  return (
    <div className='min-[600px]:hidden' >
      <button
        onClick={toggleSidebar}
        className="p-3 border-2 bg-white shadow-lg rounded-md"
        aria-label="toggle sidebar"
      >
        <GiHamburgerMenu />
      </button>
      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm "
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 bg-white"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2  border-slate-400">
                <motion.div whileInView={{rotate: 180}} exit={{rotate: -180}}>
                  <Image src={logo} width={50} height={50} alt='logo.png' />
                </motion.div>
                <motion.button {...framerRollBack}
                  onClick={toggleSidebar}
                  className="p-3 border-2 text-black rounded-xl"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </motion.button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item
                  return (
                    <li key={title}>
                      <a
                        onClick={toggleSidebar}
                        href={href}
                        className="flex items-center justify-between gap-5 transition-all m-5 hover:text-white"
                      >
                        <motion.div {...framerText(idx)} className='w-full flex justify-between text-center hover:bg-blue-500 border-2 border-cyan-400 p-3 rounded-xl' >
                          <span >{title}</span>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

