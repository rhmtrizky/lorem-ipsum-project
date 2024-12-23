import { instagram, linkedin, twitter } from '@/assets/images/images'
import { motion } from 'framer-motion'
import Image from 'next/image'

import React from 'react'

export default function SocialMedia() {
    return (
        <figure className='flex max-[950px]:flex-col gap-4' >
            <motion.div
                whileHover={{ y: -4 }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
            >
                <Image
                    src={linkedin}
                    width={13}
                    height={13}
                    alt="linkedin"
                />
            </motion.div>
            <motion.div
                whileHover={{ y: -4 }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
            >
                <Image
                    src={twitter}
                    width={13}
                    height={13}
                    alt="mail"
                />
            </motion.div>

            <motion.div
                whileHover={{ y: -4 }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
            >
                <Image
                    src={instagram}
                    width={15}
                    height={15}
                    alt="instagram"
                />
        </motion.div>
        </figure>
    )
}
