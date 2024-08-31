import InputUi from '@/components/ui/Input';
import ImageUpload from '@/components/views/Admin/Ui/ImageUpload';
import ModalUi from '@/components/views/Admin/Ui/Modal';
import { ToasterContext } from '@/contexts/ToasterContext';
import useSpecialist from '@/hooks/useSpecialist';
import userService from '@/services/user';
import doctorService from '@/services/user/doctor';
import pharmacyService from '@/services/user/pharmacy';
import handleImageUpload from '@/utils/uploadImage';
import { Button, Select, SelectItem } from '@nextui-org/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

const ModalUpdateProfileAdmin = ({ openModal, setOpenModal, isOpen, onOpenChange, setState, id, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);
  const { specialists } = useSpecialist();
  const [imageFile, setImageFile] = useState(null);
  const [schedules, setSchedules] = useState(openModal.schedule || [{ day: '', startTime: '', endTime: '' }]);

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
      setSchedules(openModal.schedule || [{ day: '', startTime: '', endTime: '' }]);
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
      password: formData.get('password'),
      phoneNumber: formData.get('phoneNumber'),
      address: formData.get('address'),
      licenceNumber: formData.get('licenceNumber'),
    };

    if (openModal.role === 'doctor') {
      data.specialist = formData.get('specialist');
      data.schedule = schedules;
    }

    if (!formData.get('password')) {
      delete data.password;
    }

    try {
      const result = await userService.updateUser(id, data, token);
      if (result.status === 200) {
        if (imageFile) {
          const downloadUrl = await handleImageUpload(imageFile, id, 'users', 'doctor image profile');
          data.image = downloadUrl;
          const result = await userService.updateUser(id, data, token);
          if (result.status === 200) {
            if (openModal.role === 'doctor') {
              const { data } = await doctorService.getDoctorById(id);
              setState(data.data);
              setToaster({
                variant: 'success',
                message: 'Berhasil update profile',
              });
            } else if (openModal.role === 'pharmacy') {
              const { data } = await pharmacyService.getPharmacyById(id);
              setState(data.data);
              setToaster({
                variant: 'success',
                message: 'Berhasil update profile',
              });
            }
            setOpenModal({});
            onOpenChange();
            setIsLoading(false);
          }
        } else {
          if (openModal.role === 'doctor') {
            const { data } = await doctorService.getDoctorById(id);
            setState(data.data);
            setToaster({
              variant: 'success',
              message: 'Berhasil update profile',
            });
          } else if (openModal.role === 'pharmacy') {
            const { data } = await pharmacyService.getPharmacyById(id);
            setState(data.data);
            setToaster({
              variant: 'success',
              message: 'Berhasil update profile',
            });
          }
          setOpenModal({});
          onOpenChange();
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
      setOpenModal({});
      onOpenChange();
      setIsLoading(false);
      setToaster({
        variant: 'error',
        message: 'Gagal update profile',
      });
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
        {openModal?.image ? (
          <div className="flex flex-col items-center gap-2 justify-center w-full">
            <Image
              src={imageFile !== null || '' ? URL.createObjectURL(imageFile) : openModal?.image}
              alt="profile"
              width={300}
              height={300}
              className="rounded-full h-[200px] w-[200px] object-cover"
            />
            <div className="relative">
              <Button
                size="sm"
                className="bg-blue-500 text-white text-sm rounded-md"
              >
                Change Image
              </Button>
              <input
                className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
                type="file"
                name="image"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </div>
        ) : (
          <ImageUpload
            stateImage={imageFile}
            setStateImage={setImageFile}
          />
        )}
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
        <InputUi
          name="address"
          type={'text'}
          placeholder={'Address'}
          label={'Address'}
          defaultValue={openModal?.address}
          className={'border-2 border-blue-300 rounded-md text-blue-900'}
          colorLabel={'blue-900'}
        />
        {openModal?.role === 'doctor' && (
          <>
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
          </>
        )}
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

export default ModalUpdateProfileAdmin;
