import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/views/Admin/Ui/Modal';
import useSpecialist from '@/hooks/useSpecialist';
import userService from '@/services/user';
import doctorService from '@/services/user/doctor';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const ModalUpdateProfile = ({ openModal, setOpenModal, isOpen, onOpenChange, setDoctor, doctorId, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { specialists } = useSpecialist();
  const [schedules, setSchedules] = useState(() => (openModal?.schedule?.length > 0 ? openModal.schedule : [{ day: '', startTime: '', endTime: '' }]));

  const addSchedule = () => {
    setSchedules([...schedules, { day: '', startTime: '', endTime: '' }]);
  };

  const removeSchedule = (index) => {
    const newSchedule = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedule);
  };

  const handleScheduleChange = (index, key, value) => {
    const newSchedules = schedules.map((schedule, i) => (i === index ? { ...schedule, [key]: value } : schedule));
    setSchedules(newSchedules);
  };

  useEffect(() => {
    if (openModal?.schedule) {
      setSchedules(openModal.schedule.length > 0 ? openModal.schedule : [{ day: '', startTime: '', endTime: '' }]);
    }
  }, [openModal]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // form
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      password: formData.get('password') || openModal.password,
      phoneNumber: formData.get('phoneNumber'),
      address: formData.get('address'),
      licenceNumber: formData.get('licenceNumber'),
      specialization: formData.get('specialization'),
      schedule: schedules,
    };

    try {
      const result = await userService.updateUser(doctorId, data, token);
      if (result.status === 200) {
        const getData = await doctorService.getDoctorById(doctorId);
        setDoctor(getData.data.data);
        setOpenModal({});
        onOpenChange();
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalUi
      title={'Update Profile'}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      setCloseModal={setOpenModal}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <InputUi
          name="fullname"
          type={'text'}
          placeholder={'Nama'}
          label={'Nama Lengkap'}
          defaultValue={openModal?.fullname}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        <InputUi
          name="email"
          type={'email'}
          placeholder={'Email'}
          label={'Email'}
          defaultValue={openModal?.email}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        <InputUi
          name="password"
          type={'password'}
          placeholder={'Password'}
          label={'Passowrd'}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        <InputUi
          name="licenceNumber"
          type={'number'}
          placeholder={'Licence Number'}
          label={'Licence Number'}
          defaultValue={openModal?.licenceNumber}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        <InputUi
          name="phoneNumber"
          type={'number'}
          placeholder={'Phone Number'}
          label={'Phone Number'}
          defaultValue={openModal?.phoneNumber}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        <div>
          <label className="text-sm font-medium text-blue-900">Pilih Spesialis</label>
          <Select
            name="specialist"
            size="sm"
            placeholder="Pilih Spesialis"
            className="border-2 border-blue-300 rounded-md text-blue-900"
            required
            onChange={(e) => setSelectedSpesialist(e.target.value)}
            defaultSelectedKeys={[openModal?.specialist]}
          >
            {specialists.map((item) => (
              <SelectItem
                key={item.specialistName}
                value={item.specialistName}
                className="w-full bg-white gap-0"
              >
                {item.specialistName}
              </SelectItem>
            ))}
          </Select>
        </div>
        <InputUi
          name="address"
          type={'text'}
          placeholder={'Address'}
          label={'Address'}
          defaultValue={openModal?.address}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        <div className="flex flex-col gap-4">
          <label>Schedule:</label>
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="flex gap-2 w-full"
            >
              <InputUi
                name={`schedule[${index}].day`}
                type={'text'}
                placeholder={'Hari'}
                label={'Hari'}
                onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                defaultValue={schedule.day}
                required
              />
              <InputUi
                name={`schedule[${index}].startTime`}
                type={'time'}
                placeholder={'Jam Mulai'}
                label={'Jam Mulai'}
                onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                defaultValue={schedule.startTime}
                required
              />
              <InputUi
                name={`schedule[${index}].endTime`}
                type={'time'}
                placeholder={'Jam Selesai'}
                label={'Jam Selesai'}
                onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                defaultValue={schedule.endTime}
                required
              />
              <Button
                color="danger"
                onClick={() => removeSchedule(index)}
              >
                <i className="bx bx-trash" />
              </Button>
            </div>
          ))}
          <Button
            onClick={addSchedule}
            className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2"
          >
            <p className="bx bx-plus-circle text-xl" />
            Add Schedule
          </Button>
        </div>
        <div className="w-full flex justify-end items-center gap-2 my-2">
          <Button
            color="danger"
            variant="light"
            onClick={() => setOpenModal({})}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white rounded p-2"
            type="submit"
            color="primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </ModalUi>
  );
};

export default ModalUpdateProfile;
