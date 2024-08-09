import React from 'react';

export default function Dropdown({ toggleDropDown, dropdownOpen, testingDay, title, specialists = [], sevenDays = [] }) {
    return (
        <>
            <label>{title}</label>
            <button
                onClick={toggleDropDown}
                className="flex justify-between text-[#654AB4] bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center border-2 border-[#654AB4]  "
                type="button"
            >
                Dropdown button
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {dropdownOpen &&
                <div className="absolute top-40 bg-white rounded-lg shadow-xl w-44">
                    <ul className="py-2 text-sm">
                        {specialists.map((specialist) => (
                            <li key={specialist.poli}>
                                <a href="#" className="block px-4 py-2 hover:bg-[#654ab47e] text-black">
                                    {specialist.poli}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            
            }

            {
                testingDay &&
                    <div className="z-10 h-[200px] absolute top-[200px] right-0 bg-white rounded-lg shadow-xl w-44  overflow-y-auto ">
                        <ul className="py-2 text-sm">
                            {sevenDays.map((day) => (
                                <li key={day.date}>
                                    <a href="#" className="block px-4 py-2 hover:bg-[#654ab47e] text-black">
                                        {day.date}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
            }
        </>
    );
}
