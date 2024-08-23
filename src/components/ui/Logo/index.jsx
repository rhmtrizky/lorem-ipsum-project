import { logo } from '@/assets/images/images'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

export default function LogoHarapanBunda() {
    return (
        <motion.div
            whileHover={{rotate: 180}}
            transition={{type: 'spring'}}
        >
            <Image
                src={logo}
                width={70}
                height={70}
                alt='logo.png'
            />
        </motion.div>
    )
}
