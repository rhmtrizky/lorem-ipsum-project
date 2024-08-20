import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import PatientDashboardLayout from '@/components/layouts/PatientDashboardLayout'
import CardFamily from '@/components/ui/Card/CardFamily'
import userService from '@/services/user'
import { useDisclosure } from '@nextui-org/react'

export default function FamilyView() {
    const { data: session } = useSession();
    const [user, setUser] = useState({ patient: [] }); 
    const [ticket, setTicket] = useState({});
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    useEffect(() => {
      if (Object.keys(ticket).length > 0) {
        onOpen();
      }
    }, [ticket]);
  
    const getDetailUser = async () => {
      try {
        const response = await userService.detailUser(session.accessToken);
        setUser(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getDetailUser();
    }, [session]);
    console.log('user', user)


    const testing = user.patient; // Jangan buat array dengan user.patient
    let patientArray = Array.isArray(testing) ? testing : []; // Pastikan patientArray adalah array

    return (
        <PatientDashboardLayout>
            <div>
                <div>
                    <h1 className='text-3xl font-bold text-slate-400 font-sans'>Anggota keluarga</h1>
                </div>
                <div className="flex flex-wrap gap-2 mt-5 border overflow-y-auto h-[300px] ">
                    {
                        patientArray.map((patient) => (
                            <CardFamily key={patient.nik} user={user} setUser={setUser} patient={patient} />
                        ))
                    }
                </div>
            </div>
        </PatientDashboardLayout>
    );
}
