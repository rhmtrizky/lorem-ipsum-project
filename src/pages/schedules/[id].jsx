import SchedulesDoctor from '@/components/views/SchedulesDoctor/'
import doctorService from '@/services/user/doctor'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Schedules() {
    const [data, setData] = useState({})
    const {id} = useRouter().query

    // console.log('id', id)

    // console.log('this is data', data)

    const getDetailDoctor = async (id) => {
        try {
            const response = await doctorService.getDoctorById(id)
            setData(response.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDetailDoctor(id)
    }, [id])

    return (
        <SchedulesDoctor data={data} />
    )
}
