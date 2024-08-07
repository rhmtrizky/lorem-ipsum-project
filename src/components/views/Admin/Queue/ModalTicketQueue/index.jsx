import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/ui/Modal';
import getDay from '@/utils/getDay';
import { Button, Checkbox } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const ModalTicketQueue = ({ onOpenChange, isOpen, users, tickteQueue, setTicketQueue }) => {
  const [doctor, setDoctor] = useState({});
  const [isSelected, setIsSelected] = useState(false);

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
                <i className="bx bx-user font-semibold" />
                <p> Doctor</p>
              </h1>
              <p className="text-sm">{doctor?.fullname}</p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-injection" />
                <p>Specialist</p>
              </h1>
              <p className="text-sm">{doctor?.specialist}</p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-time-five"></i>
                <p>Schedule</p>
              </h1>
              <p className="text-sm">
                {tickteQueue?.schedule?.day} - ({tickteQueue?.schedule?.startTime} - {tickteQueue?.schedule?.endTime})
              </p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-time-five"></i>
                <p>Book Date</p>
              </h1>
              <p className="text-sm">
                {getDay(tickteQueue.bookDate)}, {tickteQueue.bookDate}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
            />
            <InputUi
              name="bornPlace"
              type={'text'}
              placeholder={'Tempat Lahir'}
              label={'Tempat Lahir'}
              defaultValue={tickteQueue.bornPlace}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={true}
            />

            <InputUi
              name="bornDate"
              type={'text'}
              placeholder={'Tanggal Lahir'}
              label={'Tanggal Lahir'}
              defaultValue={tickteQueue.bornDate}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={true}
            />

            <InputUi
              name="gender"
              type={'text'}
              placeholder={'Jenis Kelamin'}
              label={'Jenis Kelamin'}
              defaultValue={tickteQueue.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={true}
            />
            <InputUi
              name="golDarah"
              type={'text'}
              placeholder={'Golongan Darah'}
              label={'Golongan Darah'}
              defaultValue={tickteQueue.golDarah}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={true}
            />
            <InputUi
              name="keluhan"
              type={'text'}
              placeholder={'Keluhan'}
              label={'Keluhan'}
              defaultValue={tickteQueue.keluhan}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={true}
            />
          </div>
          <Button
            // onClick={addSchedule}
            className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2 w-full"
          >
            <p className="bx bxs-download text-xl" />
            Download Ticket
          </Button>
          <div className="w-full">
            <Checkbox
              isSelected={isSelected}
              onValueChange={setIsSelected}
              className="w-full text-sm"
            >
              Pastikan semua data sudah benar.
            </Checkbox>
          </div>
          <div className="w-full flex justify-end items-center gap-2 my-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => setTicketQueue({})}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              className={`${isSelected ? 'bg-[#3b82f6]' : 'bg-[#A0C4FD]'} font-semibold text-white p-2 rounded-md`}
              isDisabled={!isSelected}
            >
              Check Up
            </Button>
          </div>
        </div>
      </ModalUi>
    </div>
  );
};

export default ModalTicketQueue;
