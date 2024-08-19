import React from 'react'

export default function CardFamily() {
    return (
        <div className="flex flex-col items-center gap-3 bg-white border-2 border-purple-700 w-max h-max rounded-lg p-3 " >
            <div className="flex justify-between w-full px-3" >
                <i class='bx bxs-trash text-red-700 cursor-pointer ' ></i>
                <i class='bx bx-edit-alt text-blue-700 cursor-pointer ' ></i>
            </div>
            <div className="flex gap-1" >
                <div className="w-12 h-12 bg-gradient-to-t from-pink-700 to-purple-700 rounded-full " ></div>
                <div className='flex flex-col gap-1 text-sm text-slate-700 font-semibold'>
                    <p>Muhammad Ghifani Ikhsan</p>
                    <p>Jakarta (29-5-2004)</p>
                </div>
            </div>
        </div>
    )
}