import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/ui/Modal';
import activityService from '@/services/activity';
import getDay from '@/utils/getDay';
import { Button, Checkbox, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ModalTicketQueue = ({ onOpenChange, isOpen, users, ticketQueue, setTicketQueue, activities, setActivities }) => {
  const { data: session } = useSession();
  const [doctor, setDoctor] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDoctors = users.filter((user) => user.role === 'doctor');
    const selectedDoctor = getDoctors.find((doctor) => doctor.id === ticketQueue.doctorId);
    setDoctor(selectedDoctor);
  }, [ticketQueue.doctorId, users]);

  const handleUpdateStatusActivities = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (ticketQueue.status === 'queue') {
      const data = {
        id: ticketQueue.id,
        status: 'preparing',
      };
      try {
        // Update the activity status to 'checkup'
        const result = await activityService.updateActivity(ticketQueue.id, data, session.accessToken);

        if (result.status === 200) {
          // Fetch the updated activities
          const activitiesResult = await activityService.getAllActivities(session.accessToken);
          setActivities(activitiesResult.data.data);
          onOpenChange(false);
          setTicketQueue({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else if (ticketQueue.status === 'preparing') {
      const data = {
        id: ticketQueue.id,
        status: 'checkup',
      };

      try {
        // Update the activity status to 'checkup'
        const result = await activityService.updateActivity(ticketQueue.id, data, session.accessToken);
        if (result.status === 200) {
          // Fetch the updated activities
          const activitiesResult = await activityService.getAllActivities(session.accessToken);

          setActivities(activitiesResult.data.data);
          onOpenChange(false);
          setTicketQueue({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else if (ticketQueue.status === 'checkup') {
      const form = e.target;
      const formData = new FormData(form);
      const data = {
        id: ticketQueue.id,
        status: 'take medicine',
        resepDokter: formData.get('resepDokter'),
        catatanDokter: formData.get('catatanDokter'),
      };

      try {
        // Update the activity status to 'take medicine'
        const result = await activityService.updateActivity(ticketQueue.id, data, session.accessToken);

        if (result.status === 200) {
          // Fetch the updated activities
          const activitiesResult = await activityService.getAllActivities(session.accessToken);

          const updatedActivities = activitiesResult.data.data;

          // Sort activities by queue number
          updatedActivities.sort((a, b) => a.queueNumber.localeCompare(b.queueNumber));

          // Create a map to keep track of the last index for each specialist
          const specialistCheckupIndex = {};
          updatedActivities.forEach((entry, index) => {
            if (entry.status === 'take medicine') {
              // Update the index of the last checkup activity for each specialist
              specialistCheckupIndex[entry.specialist] = index;
            }
          });

          // Update the status of subsequent entries to 'preparation'
          const newActivities = updatedActivities.map((activity, index) => {
            const specialist = activity.specialist;
            const checkupIndex = specialistCheckupIndex[specialist];

            if (checkupIndex !== undefined && index > checkupIndex && index <= checkupIndex + 1) {
              return { ...activity, status: 'checkup' };
            }
            return activity;
          });

          const preparingActivities = newActivities.filter((activity) => activity.status === 'checkup');

          // Update the activities (HIT API)
          preparingActivities.forEach(async (activity) => await activityService.updateActivity(activity.id, activity, session.accessToken));

          setActivities(newActivities);
          onOpenChange(false);
          setTicketQueue({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <ModalUi
        title={''}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setTicketQueue}
      >
        <form
          onSubmit={handleUpdateStatusActivities}
          className="flex flex-col justify-center items-center gap-1"
        >
          <div className="flex flex-col justify-center items-center text-white font-semibold bg-blue-500 h-[80px] w-[120px] rounded-md ">
            <h1>Ticket Queue</h1>
            <h1 className="text-4xl font-bold">{ticketQueue?.queueNumber}</h1>
          </div>
          <h1 className="font-semibold text-blue-900">Status : {ticketQueue?.status.charAt(0).toUpperCase() + ticketQueue?.status.slice(1)}</h1>
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
                {ticketQueue?.schedule?.day} - ({ticketQueue?.schedule?.startTime} - {ticketQueue?.schedule?.endTime})
              </p>
            </div>
            <div className="flex justify-between items-center ">
              <h1 className="font-semibold flex gap-1 justify-center items-center">
                <i className="bx bx-time-five"></i>
                <p>Book Date</p>
              </h1>
              <p className="text-sm">
                {getDay(ticketQueue.bookDate)}, {ticketQueue.bookDate}
              </p>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col gap-3">
            <InputUi
              name="name"
              type={'text'}
              placeholder={'Nama'}
              label={'Nama Pasien'}
              defaultValue={ticketQueue.name}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />
            <InputUi
              name="nik"
              type={'text'}
              placeholder={'NIK'}
              label={'NIK'}
              defaultValue={ticketQueue.nik}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />
            <InputUi
              name="bpjsNumber"
              type={'text'}
              placeholder={'No BPJS'}
              label={'No BPJS'}
              defaultValue={ticketQueue.bpjsNumber}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />
            <InputUi
              name="bornPlace"
              type={'text'}
              placeholder={'Tempat Lahir'}
              label={'Tempat Lahir'}
              defaultValue={ticketQueue.bornPlace}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />

            <InputUi
              name="bornDate"
              type={'text'}
              placeholder={'Tanggal Lahir'}
              label={'Tanggal Lahir'}
              defaultValue={ticketQueue.bornDate}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />

            <InputUi
              name="gender"
              type={'text'}
              placeholder={'Jenis Kelamin'}
              label={'Jenis Kelamin'}
              defaultValue={ticketQueue.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />
            <InputUi
              name="golDarah"
              type={'text'}
              placeholder={'Golongan Darah'}
              label={'Golongan Darah'}
              defaultValue={ticketQueue.golDarah}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />
            <InputUi
              name="keluhan"
              type={'text'}
              placeholder={'Keluhan'}
              label={'Keluhan'}
              defaultValue={ticketQueue.keluhan}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled
            />
            {ticketQueue.status === 'checkup' || ticketQueue.status === 'take medicine' ? (
              <>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm font-medium text-blue-900">Resep Dokter</label>
                  <Textarea
                    key={'faded'}
                    name="resepDokter"
                    variant={'faded'}
                    labelPlacement="outside"
                    placeholder="Resep Dokter"
                    defaultValue={ticketQueue.status === 'take medicine' ? ticketQueue?.resepDokter : ''}
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm font-medium text-blue-900">Catatan Dokter</label>
                  <Textarea
                    key={'faded'}
                    name="catatanDokter"
                    variant={'faded'}
                    labelPlacement="outside"
                    placeholder="Catatan Dokter"
                    defaultValue={ticketQueue.status === 'take medicine' ? ticketQueue?.catatanDokter : ''}
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
                  />
                </div>
              </>
            ) : null}
          </div>
          <Button className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2 w-full">
            <p className="bx bxs-download text-xl" />
            Download Ticket
          </Button>
          {ticketQueue.status === 'queue' && (
            <div className="w-full">
              <Checkbox
                isSelected={isSelected}
                onValueChange={setIsSelected}
                className="w-full text-sm"
              >
                Pastikan semua data sudah benar.
              </Checkbox>
            </div>
          )}

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
              className={`${ticketQueue.status === 'queue' ? (isSelected ? 'bg-[#3b82f6]' : 'bg-[#A0C4FD]') : 'bg-[#3b82f6]'} font-semibold text-white p-2 rounded-md`}
              isDisabled={ticketQueue.status === 'queue' ? !isSelected || isLoading : false}
            >
              {isLoading ? 'Loading..' : 'Submit'}
            </Button>
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalTicketQueue;
