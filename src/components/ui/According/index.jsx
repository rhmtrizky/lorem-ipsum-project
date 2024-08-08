import { quetions } from '@/constraint'
import { motion } from 'framer-motion'

export default function According({ accorToggle, openIndex }) {
    return (
        <>
            {quetions.map((item, index) => (
                <div key={item.title} className='w-[650px] bg-white rounded-lg mb-2 shadow-md group'>
                    <button 
                        className='w-full flex items-center px-1 py-2 text-left focus:outline-none focus:border-2 focus:border-[#654ab4] rounded-lg'
                        onClick={() => accorToggle(index)}>
                        <div className={`w-8 h-8 flex justify-center items-center ${openIndex === index ? 'bg-[#654ab4]' : 'bg-[#6f56bbcc]'} rounded-lg mr-7`}>
                            {openIndex === index 
                                ? <div className='flex items-center w-[20px] h-[4px] bg-white rounded-full'></div>
                                : <div className='flex justify-center items-center w-[20px] h-[4px] bg-white rounded-full'>
                                    <div className='w-[20px] h-[5px] bg-white rounded-full' style={{ transform: 'rotate(90deg)' }}></div>
                                   </div>}
                        </div>
                        <p className='focus:text-red-900 text-[14px]' >{item.title}</p>
                    </button>
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: openIndex === index ? 'auto' : 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'>
                        <div className='p-4 border-t border-gray-200'>
                            <p>{item.keterangan}</p>
                        </div>
                    </motion.div>
                </div>
            ))}
        </>
    )
}
