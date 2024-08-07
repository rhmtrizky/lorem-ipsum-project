import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/ui/Modal';
import { useEffect, useState } from 'react';

const ModalTicketQueue = ({ onOpenChange, isOpen, users, tickteQueue, setTicketQueue }) => {
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const getDoctors = users.filter((user) => user.role === 'doctor');
    setDoctor(getDoctors.find((doctor) => doctor.id === tickteQueue.doctorId));
  });

  return (
    <div>
      <ModalUi
        title={''}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setTicketQueue}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center text-white font-semibold bg-blue-500 h-[80px] w-[120px] rounded-md">
            <h1>Ticket Queue</h1>
            <h1 className="text-4xl font-bold">{tickteQueue?.queueNumber}</h1>
          </div>
          <div className="border-2 border-blue-300 rounded-md p-3 w-full text-md text-blue-900 flex flex-col gap-1 mt-2">
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i class="bx bx-user font-semibold" />
                Doctor
              </h1>
              <p className="text-sm">{doctor?.fullname}</p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i class="bx bx-injection" />
                Specialist
              </h1>
              <p className="text-sm">{doctor?.specialist}</p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i class="bx bx-time-five"></i>
                Time
              </h1>
              <p className="text-sm">
                {tickteQueue?.schedule?.day} - ({tickteQueue?.schedule?.time})
              </p>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col gap-3">
            <InputUi
              name="name"
              type={'text'}
              placeholder={'Nama'}
              label={'Nama Pasien'}
              defaultValue={tickteQueue.name}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
            />
            <InputUi
              name="nik"
              type={'text'}
              placeholder={'NIK'}
              label={'NIK'}
              defaultValue={tickteQueue.nik}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
            />
            <InputUi
              name="bpjsNumber"
              type={'text'}
              placeholder={'No BPJS'}
              label={'No BPJS'}
              defaultValue={tickteQueue.bpjsNumber}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
            />
          </div>
        </div>
      </ModalUi>
    </div>
  );
};

export default ModalTicketQueue;
