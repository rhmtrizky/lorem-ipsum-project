import React from 'react'
import FormEditPatient from '../../Form/FormEditPatient'
import { Button } from '@nextui-org/react'

export default function CardFamily({ user, setUser, data, index, patient }) {
    return (
        <div className="flex flex-col items-center gap-3 bg-white border-2 border-purple-700 w-max h-max rounded-lg p-3">
            <div className="flex items-center justify-between w-full">
                <Button isIconOnly >
                    <i className='bx bxs-trash text-red-700 cursor-pointer'></i>
                </Button>
                <FormEditPatient
                    user={user}
                    setUser={setUser}
                    patient={patient}
                />
            </div>
            <div className="flex gap-1">
                <div className="w-12 h-12 bg-gradient-to-t from-pink-700 to-purple-700 rounded-full"></div>
                <div className='flex flex-col gap-1 text-sm text-slate-700 font-semibold'>
                    <p>{patient.name}</p>
                    <p>{patient.bornPlace} <span>({patient.bornDate})</span></p>
                </div>
            </div>
        </div>
    )
}
