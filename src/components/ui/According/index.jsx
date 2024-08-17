import { quetions } from '@/constraint'
import { motion } from 'framer-motion'

export default function According({ accorToggle, openIndex }) {
    return (
        <>
            {quetions.map((item, index) => (
                <div key={item.title} className='max-[545px]:w-full max-[678px]:w-[500px] max-w-[800px] bg-white rounded-lg mr-12 mb-2 shadow-md'>
                    <button 
                        className='flex items-center px-1 py-2 text-left focus:outline-none rounded-lg'
                        onClick={() => accorToggle(index)}>
                        <div className={`w-4 h-4 p-4 flex justify-center items-center border-box ${openIndex === index ? 'bg-[#654ab4]' : 'bg-[#6f56bbcc]'} rounded-lg mr-5`}>
                            {openIndex === index 
                                ? <div className='flex items-center'>
                                    <div className=' w-[20px] h-[4px] bg-white rounded-full' ></div>
                                </div>
                                : <div className='flex justify-center items-center w-[20px] h-[4px] bg-white rounded-full'>
                                    <div className='w-[20px] h-[5px] bg-white rounded-full' style={{ transform: 'rotate(90deg)' }}></div>
                                   </div>}
                        </div>
                        <div  >
                            <p className='focus:text-red-900 text-[14px]' >{item.title}</p>
                        </div>
                    </button>
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: openIndex === index ? 'auto' : 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'>
                        <div className='p-4 border-t border-gray-200 '>
                            <p>{item.keterangan}</p>
                        </div>
                    </motion.div>
                </div>
            ))}
        </>
    )
}