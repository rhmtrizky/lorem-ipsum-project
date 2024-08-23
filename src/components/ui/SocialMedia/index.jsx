import { instagram, linkedin, twitter } from '@/assets/images/images'
import { motion } from 'framer-motion'
import Image from 'next/image'

import React from 'react'

export default function SocialMedia() {
    return (
        <figure className='flex gap-4' >
            <motion.div
                whileHover={{ y: -4 }}
                className="hidden w-8 h-8 min-[950px]:flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
            >
                <Image
                    src={linkedin}
                    width={13}
                    height={13}
                    alt="linkedin.png"
                />
            </motion.div>
            <motion.div
                whileHover={{ y: -4 }}
                className="hidden w-8 h-8 min-[950px]:flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
            >
                <Image
                    src={twitter}
                    width={13}
                    height={13}
                    alt="mail.png"
                />
            </motion.div>

            <motion.div
                whileHover={{ y: -4 }}
                className="hidden w-8 h-8 min-[950px]:flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
            >
                <Image
                    src={instagram}
                    width={15}
                    height={15}
                    alt="instagram.png"
                />
        </motion.div>
        </figure>
    )
}
