import PatientDashboardLayout from '@/components/layouts/PatientDashboardLayout'
import CardFamily from '@/components/ui/Card/CardFamily'
import React from 'react'

export default function FamilyView() {
    return (
        <PatientDashboardLayout>
            <div>
                <div>
                    <h1 className='text-3xl font-bold text-slate-400 font-sans' >Anggota keluarga</h1>   
                </div>
                <div className="flex flex-wrap gap-2 mt-5 border overflow-y-auto h-[300px] " >
                    <CardFamily/>
                </div>
            </div>
        </PatientDashboardLayout>
    )
}