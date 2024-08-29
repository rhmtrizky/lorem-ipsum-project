import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PatientDashboardLayout from '@/components/layouts/PatientDashboardLayout';
import CardFamily from '@/components/ui/Card/CardFamily';
import userService from '@/services/user';
import Image from 'next/image';
import { emptyData } from '@/assets/images/images';
import ModalDeleteFamily from './ModalDeleteFamily';
import { useDisclosure } from '@nextui-org/react';
import { ToasterContext } from '@/contexts/ToasterContext';

export default function FamilyView() {
  const { data: session } = useSession();
  const [user, setUser] = useState({ patient: [] });
  const [deleteFamily, setDeleteFamily] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);

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

  const patientArray = user?.patient;

  const handleRemoveFamily = async () => {
    setIsLoading(true);
    const newPatient = patientArray.filter((_, i) => i !== deleteFamily.index);
    try {
      const update = await userService.updateUser(user.id, { patient: newPatient }, session?.accessToken);
      if (update.status === 200) {
        const result = await userService.detailUser(session?.accessToken);
        setUser(result.data.data);
        setDeleteFamily({});
        onOpenChange(false);
        setIsLoading(false);
        setToaster({
          variant: 'success',
          message: 'Anggota keluarga dihapus',
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setToaster({
        variant: 'error',
        message: 'Gagal menghapus anggota keluarga',
      });
    }
  };

  return (
    <>
      <PatientDashboardLayout>
        <div>
          <div>
            <h1 className="text-2xl font-bold text-slate-400 font-sans">Anggota keluarga</h1>
          </div>
          <div className="flex flex-wrap gap-2 mt-5 border overflow-y-auto h-[300px]">
            {patientArray?.length > 0 ? (
              patientArray.map((patient, index) => (
                <CardFamily
                  key={patient.nik}
                  user={user}
                  setUser={setUser}
                  patient={patient}
                  index={index}
                  setDeleteFamily={setDeleteFamily}
                  onOpen={onOpen}
                />
              ))
            ) : (
              <div className="flex flex-col gap-1 justify-center items-center w-full h-fit py-10 bg-white rounded-lg">
                <Image
                  src={emptyData}
                  alt="empty-data"
                  width={400}
                  height={300}
                  className="animate-pulse"
                />
                <h1 className="text-lg font-bold text-[#654AB4] font-sans italic">Kamu belum ada data keluarga..</h1>
              </div>
            )}
          </div>
        </div>
      </PatientDashboardLayout>
      {Object.keys(deleteFamily).length > 0 && (
        <ModalDeleteFamily
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setDeleteFamily={setDeleteFamily}
          deleteFamily={deleteFamily}
          handleRemoveFamily={handleRemoveFamily}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
