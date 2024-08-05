import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/ui/Modal';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ModalAddUser = ({ onOpenChange, isOpen, setUsers, setAddUser }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('');
  const [schedules, setSchedules] = useState([{ day: '', time: '' }]);
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

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'pharmacy', label: 'Pharmacy' },
  ];

  const gender = [
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' },
  ];

  const golDarah = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' },
  ];

  const handleAddUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
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
        // image: formData.get('image'),
      };
    }

    try {
      const result = await userService.addUser(data, session.data.accessToken);
      if (result.status === 200) {
        const { data } = await userService.getAllUsers(session.data.accessToken);
        setUsers(data.data);
        onOpenChange(false);
        setIsLoading(false);
        setAddUser({ status: false });
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
    setSchedules([...schedules, { day: '', time: '' }]);
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
          className="flex flex-col gap-4"
          onSubmit={handleAddUser}
        >
          <InputUi
            name="fullname"
            type={'text'}
            placeholder={'Fullname'}
            required
          />
          <InputUi
            name={'email'}
            type={'email'}
            placeholder={'Email'}
            required
          />
          <InputUi
            name={'password'}
            type={'password'}
            placeholder={'Password'}
            required
          />
          <InputUi
            name={'phoneNumber'}
            type={'number'}
            placeholder={'Phone Number'}
            required
          />
          <Select
            name="role"
            size="sm"
            placeholder="Select role"
            className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white"
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
                    onChange={(e) => handlePatientsChange(index, 'name', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bornPlace`}
                    type={'text'}
                    placeholder={'Tempat Lahir'}
                    onChange={(e) => handlePatientsChange(index, 'bornPlace', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bornDate`}
                    type={'date'}
                    placeholder={'Tanggal Lahir'}
                    onChange={(e) => handlePatientsChange(index, 'bornDate', e.target.value)}
                    required
                  />
                  <Select
                    name={`patient[${index}].gender`}
                    size="sm"
                    placeholder="Jenis Kelamin"
                    className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white"
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
                  <InputUi
                    name={`patient[${index}].nik`}
                    type={'number'}
                    placeholder={'NIK'}
                    onChange={(e) => handlePatientsChange(index, 'nik', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].bpjsNumber`}
                    type={'number'}
                    placeholder={'No BPJS'}
                    onChange={(e) => handlePatientsChange(index, 'bpjsNumber', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].fatherName`}
                    type={'text'}
                    placeholder={'Nama Ayah'}
                    onChange={(e) => handlePatientsChange(index, 'fatherName', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].motherName`}
                    type={'text'}
                    placeholder={'Nama Ibu'}
                    onChange={(e) => handlePatientsChange(index, 'motherName', e.target.value)}
                    required
                  />
                  <InputUi
                    name={`patient[${index}].address`}
                    type={'text'}
                    placeholder={'Alamat'}
                    onChange={(e) => handlePatientsChange(index, 'address', e.target.value)}
                    required
                  />
                  <Select
                    name={`patient[${index}].golDarah`}
                    size="sm"
                    placeholder="Golongan Darah"
                    className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white"
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
                  <InputUi
                    name={`patient[${index}].suku`}
                    type={'text'}
                    placeholder={'Suku'}
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
              <InputUi
                name={'specialist'}
                type={'text'}
                placeholder={'Specialist'}
                required
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
                      placeholder={'Day'}
                      value={schedule.day}
                      onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                      required
                    />
                    <InputUi
                      name={`schedule[${index}].time`}
                      type={'text'}
                      placeholder={'Time'}
                      value={schedule.time}
                      onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
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
