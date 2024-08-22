import InputUi from '@/components/ui/Input';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState, useRef } from 'react';
import { roles, gender, golDarah } from '@/constraint/adminPanel';
import specialistService from '@/services/specialist';
import ImageUpload from '../../Ui/ImageUpload';
import handleImageUpload from '@/utils/uploadImage';
import useSpecialist from '@/hooks/useSpecialist';
import ModalUi from '../../Ui/Modal';

const ModalAddUser = ({ onOpenChange, isOpen, setUsers, setAddUser }) => {
  const session = useSession();
  const { specialists, setSpecialists } = useSpecialist();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [schedules, setSchedules] = useState([{ day: '', startTime: '', endTime: '' }]);
  const [openFormAddSpecialist, setOpenFormAddSpecialist] = useState({
    status: false,
    newSpecialistName: '',
  });
  const [patients, setPatients] = useState([
    {
      name: '',
      bornPlace: '',
      bornDate: '',
      gender: '',
      nik: '',
      bpjsNumber: '',
      fatherName: '',
      motherName: '',
      address: '',
      golDarah: '',
      suku: '',
    },
  ]);

  // handle add new specialist
  const handleAddSpecialist = async (event) => {
    event.preventDefault();
    const data = {
      specialistName: openFormAddSpecialist.newSpecialistName,
    };
    try {
      const result = await specialistService.addSpecialist(data, session.data.accessToken);
      if (result.status === 200) {
        const result = await specialistService.getSpecialists(session.data.accessToken);
        setSpecialists(result.data.data);
        setOpenFormAddSpecialist({ status: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = formRef.current;

    if (!form.checkValidity()) {
      setIsLoading(false);
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);

    let data = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      password: formData.get('password'),
      phoneNumber: formData.get('phoneNumber'),
      role: formData.get('role'),
    };

    if (data.role == 'patient') {
      data = {
        ...data,
        patient: patients,
      };
    } else if (data.role == 'doctor') {
      data = {
        ...data,
        specialist: formData.get('specialist'),
        licenceNumber: formData.get('licenceNumber'),
        address: formData.get('address'),
        schedule: schedules,
      };
    } else if (data.role == 'pharmacy') {
      data = {
        ...data,
        licenceNumber: formData.get('licenceNumber'),
        address: formData.get('address'),
      };
    }

    try {
      const result = await userService.addUser(data, session.data.accessToken);
      if (result.status === 200) {
        if (imageFile) {
          try {
            const downloadUrl = await handleImageUpload(imageFile, result.data.data.id, 'users', 'doctor image profile');
            data.image = downloadUrl;
            const update = await userService.updateUser(result.data.data.id, data, session.data.accessToken);
            if (update.status === 200) {
              const { data } = await userService.getAllUsers(session.data.accessToken);
              setUsers(data.data);
              onOpenChange(false);
              setIsLoading(false);
              setAddUser({ status: false });
            }
          } catch (error) {
            console.error('Image upload failed:', error);
          }
        } else {
          const { data } = await userService.getAllUsers(session.data.accessToken);
          setUsers(data.data);
          onOpenChange(false);
          setIsLoading(false);
          setAddUser({ status: false });
        }
      }
    } catch (err) {
      console.log(err);
      onOpenChange(false);
      setIsLoading(false);
      setAddUser({ status: false });
    }
  };

  // schedules
  const addSchedule = () => {
    setSchedules([...schedules, { day: '', startTime: '', endTime: '' }]);
  };

  const removeSchedule = (index) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const handleScheduleChange = (index, key, value) => {
    const newSchedules = schedules.map((schedule, i) => (i === index ? { ...schedule, [key]: value } : schedule));
    setSchedules(newSchedules);
  };

  // patients
  const addPatient = () => {
    setPatients([...patients, { name: '', bornPlace: '', bornDate: '', gender: '', nik: '', bpjsNumber: '', fatherName: '', motherName: '', address: '', golDarah: '', suku: '' }]);
  };

  const removePatient = (index) => {
    const newPatients = patients.filter((_, i) => i !== index);
    setPatients(newPatients);
  };

  const handlePatientsChange = (index, key, value) => {
    const newPatients = patients.map((patient, i) => (i === index ? { ...patient, [key]: value } : patient));
    setPatients(newPatients);
  };

  return (
    <div>
      <ModalUi
        title={'Add New User'}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setAddUser}
      >
        <form
          className="flex flex-col gap-3"
          ref={formRef}
        >
          <InputUi
            name="fullname"
            type={'text'}
            placeholder={'Fullname'}
            label={'Name Lengkap'}
            required
          />
          <InputUi
            name={'email'}
            type={'email'}
            placeholder={'Email'}
            label={'Email'}
            required
          />
          <InputUi
            name={'password'}
            type={'password'}
            placeholder={'Password'}
            label={'Password'}
            required
          />
          <InputUi
            name={'phoneNumber'}
            type={'number'}
            placeholder={'Phone Number'}
            label={'No Handphone'}
            required
          />
          <div>
            <label
              htmlFor={'role'}
              className="text-sm font-medium text-neutral-800"
            >
              Pilih Role
            </label>
            <Select
              name="role"
              size="sm"
              placeholder="Select role"
              className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
              required
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <SelectItem
                  key={role.value}
                  value={role.value}
                  className="w-full bg-white gap-0"
                >
                  {role.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          {role == 'patient' && (
            <div className="flex flex-col gap-4">
              {patients.map((patient, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{`Data Pasien ${index + 1}`}</h2>
                    <Button
                      className="bg-red-500 text-white rounded p-2 w-4 h-8 "
                      color="danger"
                      onClick={() => removePatient(index)}
                    >
                      <i className="bx bx-trash" />
                    </Button>
                  </div>
                  <InputUi
                    name={`patient[${index}].name`}
                    type={'text'}
                    placeholder={'Patient Name'}
                    label={'Name Pasien'}
                    onChange={(e) => handlePatientsChange(index, 'name', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bornPlace`}
                    type={'text'}
                    placeholder={'Tempat Lahir'}
                    label={'Tempat Lahir'}
                    onChange={(e) => handlePatientsChange(index, 'bornPlace', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bornDate`}
                    type={'date'}
                    placeholder={'Tanggal Lahir'}
                    label={'Tanggal Lahir'}
                    onChange={(e) => handlePatientsChange(index, 'bornDate', e.target.value)}
                    required
                  />
                  <div>
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium text-neutral-800"
                    >
                      Jenis Kelamin
                    </label>
                    <Select
                      name={`patient[${index}].gender`}
                      size="sm"
                      placeholder="Jenis Kelamin"
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                      onChange={(e) => handlePatientsChange(index, 'gender', e.target.value)}
                      required
                    >
                      {gender.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="w-full bg-white gap-0"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <InputUi
                    name={`patient[${index}].nik`}
                    type={'number'}
                    placeholder={'NIK'}
                    label={'NIK'}
                    onChange={(e) => handlePatientsChange(index, 'nik', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bpjsNumber`}
                    type={'number'}
                    placeholder={'No BPJS'}
                    label={'No BPJS'}
                    onChange={(e) => handlePatientsChange(index, 'bpjsNumber', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].fatherName`}
                    type={'text'}
                    placeholder={'Nama Ayah'}
                    label={'Nama Ayah'}
                    onChange={(e) => handlePatientsChange(index, 'fatherName', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].motherName`}
                    type={'text'}
                    placeholder={'Nama Ibu'}
                    label={'Nama Ibu'}
                    onChange={(e) => handlePatientsChange(index, 'motherName', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].address`}
                    type={'text'}
                    placeholder={'Alamat'}
                    label={'Alamat'}
                    onChange={(e) => handlePatientsChange(index, 'address', e.target.value)}
                    required
                  />
                  <div>
                    <label className="text-sm font-medium text-neutral-800">Golongan Darah</label>
                    <Select
                      name={`patient[${index}].golDarah`}
                      size="sm"
                      placeholder="Golongan Darah"
                      className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                      required
                      onChange={(e) => handlePatientsChange(index, 'golDarah', e.target.value)}
                    >
                      {golDarah.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="w-full bg-white gap-0"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <InputUi
                    name={`patient[${index}].suku`}
                    type={'text'}
                    placeholder={'Suku'}
                    label={'Suku'}
                    onChange={(e) => handlePatientsChange(index, 'suku', e.target.value)}
                    required
                  />
                </div>
              ))}
              <Button
                onClick={addPatient}
                className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2"
              >
                <p className="bx bx-plus-circle text-xl" />
                Add Patient
              </Button>
            </div>
          )}
          {role == 'doctor' && (
            <>
              <ImageUpload
                stateImage={imageFile}
                setStateImage={setImageFile}
              />
              <div className={`flex flex-col gap-2 ${openFormAddSpecialist.status ? 'border-2 border-neutral-200 p-4 rounded-md ' : 'border-0'}`}>
                <label className="text-sm font-medium text-neutral-800">Pilih Spesialis</label>
                <Select
                  name="specialist"
                  size="sm"
                  placeholder="Pilih Spesialis"
                  className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white text-sm"
                  required
                >
                  {specialists.map((item) => (
                    <SelectItem
                      key={item.specialistName}
                      value={item.specialistName}
                      className="w-full bg-white gap-0"
                    >
                      {item?.specialistName?.charAt(0).toUpperCase() + item?.specialistName?.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
                <div className={`w-full  flex ${openFormAddSpecialist.status ? 'justify-center' : 'justify-end'}`}>
                  {openFormAddSpecialist.status ? (
                    <div className="w-full">
                      <InputUi
                        name="specialistName"
                        type="text"
                        label="Spesialis Baru"
                        placeholder="Spesialis Baru"
                        onChange={(e) =>
                          setOpenFormAddSpecialist((prevState) => ({
                            ...prevState,
                            newSpecialistName: e.target.value.toLowerCase(),
                          }))
                        }
                      />
                      <div className="w-full flex justify-end items-center gap-2 my-2">
                        <Button
                          color="danger"
                          variant="light"
                          size="sm"
                          className="text-sm"
                          onClick={() => setOpenFormAddSpecialist({ status: false })}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          color="primary"
                          type="submit"
                          className="bg-[#3b82f6] text-white p-2 rounded-md text-sm"
                          onClick={handleAddSpecialist}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="w-fit bg-blue-500 text-xs rounded-md px-2 text-white"
                      onClick={() => setOpenFormAddSpecialist({ status: true })}
                    >
                      Add New Specialist
                    </Button>
                  )}
                </div>
              </div>
              <InputUi
                name={'licenceNumber'}
                type={'number'}
                label={'No Lisensi'}
                placeholder={'Licence Number'}
                required
              />
              <InputUi
                name={'address'}
                type={'text'}
                label={'Alamat'}
                placeholder={'Alamat'}
                required
              />
              <div className="flex flex-col gap-4">
                <label>Schedule:</label>
                {schedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex gap-2 w-full items-center"
                  >
                    <InputUi
                      name={`schedule[${index}].day`}
                      type={'text'}
                      placeholder={'Hari'}
                      value={schedule.day}
                      label={'Hari'}
                      onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                      required
                    />
                    <InputUi
                      name={`schedule[${index}].startTime`}
                      type={'time'}
                      placeholder={'Jam Mulai'}
                      label={'Jam Mulai'}
                      value={schedule.startTime}
                      onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                      required
                    />
                    <InputUi
                      name={`schedule[${index}].endTime`}
                      type={'time'}
                      placeholder={'Jam Selesai'}
                      label={'Jam Selesai'}
                      value={schedule.endTime}
                      onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
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
          {role == 'pharmacy' && (
            <>
              <ImageUpload
                stateImage={imageFile}
                setStateImage={setImageFile}
              />
              <InputUi
                name={'licenceNumber'}
                type={'number'}
                placeholder={'Licence Number'}
                required
              />
              <InputUi
                name={'address'}
                type={'text'}
                placeholder={'Address'}
                required
              />
            </>
          )}
          <div className="w-full flex justify-end items-center gap-2 my-2">
            <Button
              color="danger"
              variant="light"
              onClick={() => setAddUser({ status: false })}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              className="bg-[#3b82f6] font-semibold text-white p-2 rounded-md"
              onClick={handleAddUser}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalAddUser;
