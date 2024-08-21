import React, { useState } from 'react';
import ModalFilterUi from '../Modal/ModalFilter';
import useSpecialist from '@/hooks/useSpecialist';
import { Select, SelectItem } from '@nextui-org/react';

export default function Filter({ setSpecialist, setDay }) {
  const { specialists } = useSpecialist();

  const sevenDays = [
    {
      date: 'Senin',
    },
    {
      date: 'Selasa',
    },
    {
      date: 'Rabu',
    },
    {
      date: 'Kamis',
    },
    {
      date: 'Jumat',
    },
    {
      date: 'Sabtu',
    },
    {
      date: 'Minggu',
    },
  ];

  return (
    <ModalFilterUi
      title={'Filter'}
      setSpecialist={setSpecialist}
      setDay={setDay}
    >
      <div>
        <label htmlFor="">Spesialis Dokter</label>
        <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
          <i className="bx bxs-time pl-4"></i>
          <Select
            name="specialists"
            size="sm"
            placeholder="Spesialis Dokter"
            className="w-full px-1.5 outline-none text-sm"
            onChange={(e) => setSpecialist(e.target.value)}
          >
            {specialists?.map((item) => (
              <SelectItem
                key={item.specialistName}
                value={item.specialistName}
                className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
              >
                {item.specialistName}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <label htmlFor="">Hari</label>
        <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
          <i className="bx bxs-time pl-4"></i>
          <Select
            name="hari"
            size="sm"
            placeholder="Hari"
            className="w-full px-1.5 outline-none text-sm"
            onChange={(e) => setDay(e.target.value)}
          >
            {sevenDays?.map((item) => (
              <SelectItem
                key={item.date}
                value={item.date}
                className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
              >
                {item.date}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </ModalFilterUi>
  );
}
