import { Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ModalQueueTicketUi from '../../Modal/ModalQueueTicket';
import generateQueueNumber from '@/utils/generateQueueNumber';
import getDay from '@/utils/getDay';
import InputUi from '../../Input';
import useActivity from '@/hooks/useActivity';
import activityService from '@/services/activity';
import { useSession } from 'next-auth/react';
import BookingRules from '@/utils/BookingRules';

export default function FormQueueTicket({ user, data, doctorId, setTicket }) {
  const { data: session } = useSession();
  const [patientIndex, setPatientIndex] = useState(null);
  const [dataPatient, setDataPatient] = useState({});
  const selectedSpesialist = data?.specialist;
  const [isLoading, setIsLoading] = useState(false);
  const { activities, setActivities } = useActivity();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(patientIndex);

  useEffect(() => {
    if (patientIndex >= 0) {
      setDataPatient(user.patient[patientIndex]);
    }
  }, [patientIndex]);

  // select doctor schedule
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [getSchedule, setGetSchedule] = useState({});

  useEffect(() => {
    if (selectedSchedule) {
      setGetSchedule(data?.schedule[selectedSchedule]);
    }
  }, [data, selectedSchedule]);

  // book date logic
  const [bookDate, setBookDate] = useState('');
  const [bookDay, setBookDay] = useState('');
  const [resultCompare, setResultCompare] = useState({});

  useEffect(() => {
    if (bookDate) {
      setBookDay(getDay(bookDate));
    }
  }, [bookDate]);

  useEffect(() => {
    BookingRules({ bookDate, bookDay, getDocter: data, getSchedule });
    setResultCompare(BookingRules({ bookDate, bookDay, getDocter: data, getSchedule }));
  }, [bookDate, bookDay, data, getSchedule, setResultCompare]);

  const handleAddQueue = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const formData = new FormData(form);

    const queueNumber = generateQueueNumber({
      activities,
      selectedSpesialist,
      bookDate,
    });
    console.log(queueNumber);

    let data = {
      queueNumber: queueNumber,
      userId: user.id,
      name: dataPatient.name,
      nik: formData.get('nik'),
      bpjsNumber: formData.get('bpjsNumber'),
      bornPlace: formData.get('bornPlace'),
      bornDate: formData.get('bornDate'),
      gender: formData.get('gender'),
      address: formData.get('address'),
      golDarah: formData.get('golDarah'),
      specialist: selectedSpesialist,
      doctorId: doctorId,
      keluhan: formData.get('keluhan'),
      bookDate: bookDate,
      schedule: getSchedule,
      status: 'queue',
    };

    console.log(data);

    try {
      const resultQueue = await activityService.addQueue(data, session.accessToken);
      console.log(resultQueue);
      if (resultQueue.status === 200) {
        const result = await activityService.getAllActivities(session.accessToken);
        setActivities(result.data.data);
        setIsLoading(false);
        onOpenChange(false);
        setTicket(resultQueue.data.data);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <ModalQueueTicketUi
      title="Get Ticket"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <form
        className="w-full"
        onSubmit={handleAddQueue}
      >
        <div className="w-full">
          <label
            htmlFor="nama-lengkap"
            className="mb-2 text-sm sr-only"
          >
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="bx bxs-user"></i>
            </div>
            <input
              type="text"
              id="nama-lengkap"
              name="fullName"
              defaultValue={user.fullname}
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Nama Lengkap Sesuai KTP "
              required
              readOnly
            />
          </div>
        </div>

        <div className="flex gap-5 mt-4 ">
          <div className="w-full">
            <label
              htmlFor="email"
              className="mb-2 text-sm sr-only"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxl-gmail"></i>
              </div>
              <input
                type="text"
                id="email"
                defaultValue={user.email}
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Email - Optional"
                readOnly
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="phone"
              className="mb-2 text-sm sr-only"
            >
              Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-phone"></i>
              </div>
              <input
                type="text"
                id="phone"
                defaultValue={user.phoneNumber}
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Phone - Optional"
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg w-full">
            <label
              htmlFor="name"
              className="mb-2 text-sm sr-only"
            >
              Pilih Anggota Keluarga
            </label>
            <i className="bx bxs-donate-blood pl-4"></i>
            <Select
              className="w-[90%] px-1.5 outline-none text-sm"
              placeholder="Pilih Anggota Keluarga"
              onChange={(e) => setPatientIndex(e.target.value)}
              name="name"
            >
              {user.patient?.map((name, index) => (
                <SelectItem
                  key={index}
                  value={index}
                  className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                >
                  {name.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        {patientIndex !== null && patientIndex !== '' && (
          <div>
            <div className="flex items-end gap-5 mt-4">
              <div className="w-full">
                <label
                  htmlFor="tempat-lahir"
                  className="mb-2 text-sm sr-only"
                >
                  Tempat Lahir
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-map-alt"></i>
                  </div>
                  <input
                    type="text"
                    id="tempat-lahir"
                    name="bornPlace"
                    defaultValue={dataPatient?.bornPlace}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Tempat Lahir"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="tanggal-lahir"
                  className="mb-2 text-sm sr-only"
                >
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-calendar-alt"></i>
                  </div>
                  <input
                    type="date"
                    id="tanggal-lahir"
                    name="bornDate"
                    defaultValue={dataPatient?.bornDate}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Tempat Lahir"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex items-end gap-5 mt-4">
              <div className="w-full">
                <label
                  htmlFor="jenis-kelamin"
                  className="mb-2 text-sm sr-only"
                >
                  Jenis Kelamin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bx-male-female"></i>
                  </div>
                  <input
                    type="text"
                    id="jenis-kelamin"
                    name="gender"
                    defaultValue={dataPatient?.gender}
                    placeholder="Jenis Kelamin"
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="golongan-darah"
                  className="mb-2 text-sm sr-only"
                >
                  Golongan Darah
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-donate-blood"></i>
                  </div>
                  <input
                    type="text"
                    id="golongan-darah"
                    name="golDarah"
                    placeholder="Golongan Darah"
                    defaultValue={dataPatient?.golDarah}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <label
                  htmlFor="nama-ibu"
                  className="mb-2 text-sm sr-only"
                >
                  Nama Ibu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-user"></i>
                  </div>
                  <input
                    type="text"
                    id="nama-ibu"
                    name="motherName"
                    defaultValue={dataPatient?.motherName}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Nama Ibu"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="nama-ayah"
                  className="mb-2 text-sm sr-only"
                >
                  Nama Ayah
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-user"></i>
                  </div>
                  <input
                    type="text"
                    id="nama-ayah"
                    name="fatherName"
                    defaultValue={dataPatient?.fatherName}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Nama Ayah"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <label
                  htmlFor="nik"
                  className="mb-2 text-sm sr-only"
                >
                  NIK
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-file"></i>
                  </div>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    defaultValue={dataPatient?.nik}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="NIK"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="bpjsNumber"
                  className="mb-2 text-sm sr-only"
                >
                  No BPJS
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-id-card"></i>
                  </div>
                  <input
                    type="text"
                    id="bpjsNumber"
                    name="bpjsNumber"
                    defaultValue={dataPatient?.bpjsNumber}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Nomor BPJS"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <label
                  htmlFor="alamat"
                  className="mb-2 text-sm sr-only"
                >
                  Alamat
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-map"></i>
                  </div>
                  <input
                    type="text"
                    id="alamat"
                    name="address"
                    defaultValue={dataPatient?.address}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Alamat"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <label
                  htmlFor="suku"
                  className="mb-2 text-sm sr-only"
                >
                  Suku
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bxs-map"></i>
                  </div>
                  <input
                    type="text"
                    id="suku"
                    name="suku"
                    defaultValue={dataPatient?.suku}
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Suku"
                    required
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-4">
              <div className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i className="bx bx-shield-plus"></i>
                  </div>
                  <input
                    name="keluhan"
                    type="text"
                    className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                    placeholder="Keluhan"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col gap-3 justify-center w-full mt-4">
              <div className="flex flex-col justify-start lg:w-1/2 md:w-1/2 sm:w-full w-full">
                <label
                  htmlFor="schedule"
                  className="text-sm"
                >
                  Jadwal Dokter
                </label>
                <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
                  <i className="bx bxs-time pl-4"></i>
                  <Select
                    name="schedule"
                    size="sm"
                    placeholder="Pilih Jadwal Dokter"
                    className="w-full px-1.5 outline-none text-sm"
                    onChange={(e) => setSelectedSchedule(e.target.value)}
                    required
                  >
                    {data?.schedule?.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={index}
                        className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                      >
                        {`${item.day} - (${item.startTime} - ${item.endTime})`}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col justify-start lg:w-1/2 md:w-1/2 sm:w-full w-full">
                <label
                  htmlFor="bookDate"
                  className="text-sm"
                >
                  Pilih Tanggal Booking
                </label>
                <div className="flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg w-full mt-2">
                  <i className="bx bxs-time pl-4"></i>

                  <InputUi
                    name="bookDate"
                    type="date"
                    className="lg:w-[250px] md:w-[250px] sm:w-full w-full outline-none text-sm mb-2"
                    placeholder="Tgl. Booking"
                    onChange={(e) => setBookDate(e.target.value)}
                    required
                  />
                </div>
                {Object.keys(resultCompare).length > 0 && <p className={`${resultCompare.status ? 'text-blue-800' : 'text-red-500 my-1'} text-sm italic`}>*{resultCompare.message}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center w-full mt-4">
          <button
            type="submit"
            className={`${resultCompare.status ? 'bg-primary' : 'bg-[#AD99E8]'} text-white py-2 px-4 rounded-lg w-full`}
            disabled={isLoading || !resultCompare.status}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </ModalQueueTicketUi>
  );
}
