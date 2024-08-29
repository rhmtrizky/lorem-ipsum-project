import InputUi from '@/components/ui/Input';
import activityService from '@/services/activity';
import getDay from '@/utils/getDay';
import { Button, Checkbox, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { gender, golDarah } from '@/constraint/adminPanel';
import ModalUi from '../../Ui/Modal';

const ModalTicketQueue = ({ onOpenChange, isOpen, users, ticketQueue, setTicketQueue, setActivities }) => {
  const { data: session } = useSession();
  const formRef = useRef(null);
  const [doctor, setDoctor] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [apoteker, setApoteker] = useState(ticketQueue?.isHandle?.apoteker || '');
  const [resepDokter, setResepDokter] = useState(
    ticketQueue.resepDokter || [
      {
        namaObat: '',
        dosis: '',
        hari: '',
        catatan: '',
      },
    ]
  );

  console.log(ticketQueue);

  const addResepDokter = () => {
    setResepDokter([...resepDokter, { namaObat: '', dosis: '', hari: '', catatan: '' }]);
  };

  const handleRemoveResepDokter = (index) => {
    const newResepDokter = resepDokter.filter((_, i) => i !== index);
    setResepDokter(newResepDokter);
  };

  const handleChangeResepDokter = (index, key, value) => {
    const newResepDokter = resepDokter.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    setResepDokter(newResepDokter);
  };

  useEffect(() => {
    const getDoctors = users.filter((user) => user.role === 'doctor');
    const selectedDoctor = getDoctors.find((doctor) => doctor.id === ticketQueue.doctorId);
    setDoctor(selectedDoctor);
  }, [ticketQueue.doctorId, users]);

  useEffect(() => {
    const getDataUser = users.find((user) => user.id === ticketQueue.userId);
    setDataUser(getDataUser);
  }, [ticketQueue.userId, users]);

  const handleUpdateStatusActivities = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // form data
    const form = formRef.current;

    if (!form.checkValidity()) {
      setIsLoading(false);
      form.reportValidity();
      return;
    }
    const formData = new FormData(form);

    if (ticketQueue.status === 'queue') {
      const data = {
        id: ticketQueue.id,
        nik: formData.get('nik'),
        bpjsNumber: formData.get('bpjsNumber'),
        bornPlace: formData.get('bornPlace'),
        bornDate: formData.get('bornDate'),
        gender: formData.get('gender'),
        address: formData.get('address'),
        golDarah: formData.get('golDarah'),
        specialist: ticketQueue.specialist,
        doctorId: ticketQueue.doctorId,
        keluhan: formData.get('keluhan'),
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
      const data = {
        id: ticketQueue.id,
        status: 'take medicine',
        isHandle: {
          status: false,
          taken: '',
        },
        resepDokter: resepDokter,
        catatanDokter: formData.get('catatanDokter'),
      };

      try {
        // Update the activity status to 'take medicine'
        const result = await activityService.updateActivity(ticketQueue.id, data, session.accessToken);

        if (result.status === 200) {
          // Fetch the updated activities
          const activitiesResult = await activityService.getAllActivities(session.accessToken);
          const updatedActivities = activitiesResult.data.data;
          console.log(updatedActivities);

          // Sort activities by queue number and date
          updatedActivities.sort((a, b) => a.queueNumber.localeCompare(b.queueNumber));

          // Create a map to keep track of the last index for each specialist and doctorId
          const specialistCheckupIndex = {};

          updatedActivities.forEach((entry, index) => {
            if (entry.status === 'take medicine') {
              // Update the index of the last checkup activity for each specialist
              specialistCheckupIndex[entry.specialist] = index;
            }
          });

          // Update the status of subsequent entries with same specialist, doctorId, and consecutive queue numbers
          const newActivities = updatedActivities.map((activity, index) => {
            const specialist = activity.specialist;
            const checkupIndex = specialistCheckupIndex[specialist];
            const currentActivityDate = new Date(activity.bookDate).toDateString();

            if (checkupIndex !== undefined && index > checkupIndex && index <= checkupIndex + 1 && activity.status === 'preparing' && new Date(updatedActivities[checkupIndex].bookDate).toDateString() === currentActivityDate && activity.doctorId === updatedActivities[checkupIndex].doctorId) {
              return { ...activity, status: 'checkup' };
            }
            return activity;
          });

          const preparingActivities = newActivities.filter((activity) => activity.status === 'checkup');

          // Update the activities (HIT API)
          for (const activity of preparingActivities) {
            await activityService.updateActivity(activity.id, activity, session.accessToken);
          }

          setActivities(newActivities);
          onOpenChange(false);
          setTicketQueue({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else if (ticketQueue.status === 'take medicine' && ticketQueue.isHandle.status === false) {
      const data = {
        id: ticketQueue.id,
        isHandle: {
          status: true,
          apoteker: formData.get('apoteker'),
          taken: formData.get('taken'),
        },
      };

      try {
        // Update the activity status isHandle is true and get taken time
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
    } else if (ticketQueue.status === 'take medicine' && ticketQueue.isHandle.status && (ticketQueue.isHandle.taken === 'today' || ticketQueue.isHandle.taken === 'waiting')) {
      const data = {
        id: ticketQueue.id,
        status: 'done',
        isHandle: {
          status: true,
          isTaken: isTaken ? true : false,
          apoteker: formData.get('apoteker'),
          taken: 'done',
        },
      };

      try {
        // Update the activity status isHandle is true and get taken time
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
    }
  };

  const handleSendWhastappMessage = async (e) => {
    e.preventDefault();
    const getDate = new Date(ticketQueue.bookDate);
    getDate.setDate(getDate.getDate() + 1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = getDate.toLocaleDateString('id-ID', options);
    const data = {
      id: ticketQueue.id,
      isHandle: {
        status: true,
        apoteker: apoteker,
        taken: 'waiting',
      },
    };
    try {
      // Update the activity status isHandle is true and get taken time
      const result = await activityService.updateActivity(ticketQueue.id, data, session.accessToken);
      if (result.status === 200) {
        // Fetch the updated activities
        const activitiesResult = await activityService.getAllActivities(session.accessToken);
        setActivities(activitiesResult.data.data);
        onOpenChange(false);
        setTicketQueue({});

        // Open whatsapp
        const urlToWhatsapp = `https://wa.me/${dataUser.phoneNumber}?text=Hallo, Selamat Pagi/Siang/Sore ${ticketQueue.gender === 'male' ? 'Bapak' : 'Ibu'} ${ticketQueue.name}. Kami dari RS Harapan Bunda, ingin menginfokan bahwa obat ${
          ticketQueue.gender === 'male' ? 'Bapak' : 'Ibu'
        } sudah dapat diambil pada hari/tanggal ${formattedDate}, dengan batas waktu pengambilan pukul 12.00 WIB. Terima Kasih.  `;
        window.open(urlToWhatsapp, '_blank');
      }
    } catch (error) {
      console.error(error);
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
          className="flex flex-col justify-center items-center gap-1"
          ref={formRef}
        >
          <div className="w-fit flex flex-col justify-center items-center text-white font-semibold bg-blue-500 h-[80px] w-[120px] rounded-md ">
            <h1>Ticket Queue</h1>
            <h1 className="text-4xl font-bold">{ticketQueue?.queueNumber}</h1>
          </div>
          <h1 className="font-semibold text-blue-900">Status : {ticketQueue?.status?.charAt(0).toUpperCase() + ticketQueue?.status.slice(1)}</h1>
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
              <p className="text-sm">{doctor?.specialist?.charAt(0).toUpperCase() + doctor?.specialist?.slice(1)}</p>
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
              disabled={ticketQueue.status !== 'queue' ? true : false}
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
              disabled={ticketQueue.status !== 'queue' ? true : false}
            />
            <InputUi
              name="bpjsNumber"
              type={'number'}
              placeholder={'No BPJS'}
              label={'No BPJS'}
              defaultValue={ticketQueue.bpjsNumber}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={ticketQueue.status !== 'queue' ? true : false}
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
              disabled={ticketQueue.status !== 'queue' ? true : false}
            />
            <InputUi
              name="bornDate"
              type={'date'}
              placeholder={'Tanggal Lahir'}
              label={'Tanggal Lahir'}
              defaultValue={ticketQueue.bornDate}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              required
              disabled={ticketQueue.status !== 'queue' ? true : false}
            />
            <div>
              <label className="text-sm font-medium text-neutral-800">Jenis Kelamin</label>
              <Select
                name="gender"
                size="sm"
                placeholder="Jenis Kelamin"
                className={'border-2 border-blue-300 rounded-md text-blue-900'}
                defaultSelectedKeys={[ticketQueue.gender]}
                required
                disabled={ticketQueue.status !== 'queue' ? true : false}
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
            <div>
              <label className="text-sm font-medium text-neutral-800">Golongan Darah</label>
              <Select
                name="golDarah"
                size="sm"
                placeholder="Golongan Darah"
                className={'border-2 border-blue-300 rounded-md text-blue-900'}
                defaultSelectedKeys={[ticketQueue.golDarah]}
                required
                disabled={ticketQueue.status !== 'queue' ? true : false}
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
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm font-medium text-blue-900">Alamat</label>
              <Textarea
                key={'faded'}
                name="address"
                variant={'faded'}
                labelPlacement="outside"
                placeholder="Alamat"
                defaultValue={ticketQueue.address}
                className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
                disabled={ticketQueue.status !== 'queue' ? true : false}
              />
            </div>
            <InputUi
              name="keluhan"
              type={'text'}
              placeholder={'Keluhan'}
              label={'Keluhan'}
              defaultValue={ticketQueue.keluhan}
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              colorLabel={'blue-900'}
              disabled={ticketQueue.status !== 'queue' ? true : false}
              required
            />
            {ticketQueue.status === 'checkup' || ticketQueue.status === 'take medicine' || ticketQueue.status === 'done' ? (
              <>
                <div className="flex flex-col gap-2 ">
                  <label className="text-sm font-medium text-blue-900">Resep Dokter:</label>
                  {resepDokter.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 w-full items-center border-2 border-blue-300 rounded-md p-4"
                    >
                      <div className="flex gap-2 w-full items-center w-full justify-center">
                        <div className="w-2/4">
                          <InputUi
                            name={`item[${index}].namaObat`}
                            type={'text'}
                            placeholder={'Nama Obat'}
                            value={item.namaObat}
                            label={'Nama Obat'}
                            defaultValue={item.namaObat}
                            onChange={(e) => handleChangeResepDokter(index, 'namaObat', e.target.value)}
                            required
                            disabled={ticketQueue.status !== 'queue' && ticketQueue.status !== 'checkup' ? true : false}
                          />
                        </div>
                        <div className="w-2/4 flex gap-2">
                          <InputUi
                            name={`item[${index}].dosis`}
                            type={'number'}
                            placeholder={'Dosis'}
                            label={'Dosis'}
                            value={item.dosis}
                            defaultValue={item.dosis}
                            onChange={(e) => handleChangeResepDokter(index, 'dosis', e.target.value)}
                            required
                            disabled={ticketQueue.status !== 'queue' && ticketQueue.status !== 'checkup' ? true : false}
                          />
                          <InputUi
                            name={`item[${index}].hari`}
                            type={'text'}
                            placeholder={'Hari'}
                            label={'Hari'}
                            value={item.hari}
                            defaultValue={item.hari}
                            onChange={(e) => handleChangeResepDokter(index, 'hari', e.target.value)}
                            required
                            disabled={ticketQueue.status !== 'queue' && ticketQueue.status !== 'checkup' ? true : false}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <InputUi
                          name={`item[${index}].catatan`}
                          type={'text'}
                          placeholder={'Catatan'}
                          label={'Catatan'}
                          value={item.hari}
                          defaultValue={item.catatan}
                          onChange={(e) => handleChangeResepDokter(index, 'catatan', e.target.value)}
                          required
                          disabled={ticketQueue.status !== 'queue' && ticketQueue.status !== 'checkup' ? true : false}
                        />
                      </div>
                      {ticketQueue.status !== 'take medicine' && ticketQueue.status !== 'done' ? (
                        <Button
                          color="danger"
                          onClick={() => handleRemoveResepDokter(index)}
                        >
                          <i className="bx bx-trash" />
                        </Button>
                      ) : null}
                    </div>
                  ))}
                  {ticketQueue.status !== 'take medicine' && ticketQueue.status !== 'done' ? (
                    <Button
                      onClick={addResepDokter}
                      className="text-xs flex items-center gap-1 items-center bg-blue-500 text-white p-2 rounded-md mt-2"
                    >
                      <p className="bx bx-plus-circle text-xl" />
                      Tambah Resep Obat
                    </Button>
                  ) : null}
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-sm font-medium text-blue-900">Catatan Dokter</label>
                  <Textarea
                    key={'faded'}
                    name="catatanDokter"
                    variant={'faded'}
                    labelPlacement="outside"
                    placeholder="Catatan Dokter"
                    defaultValue={ticketQueue.status === 'take medicine' || ticketQueue.status === 'done' ? ticketQueue?.catatanDokter : ''}
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
                    disabled={ticketQueue.status !== 'checkup' ? true : false}
                    required
                  />
                </div>
              </>
            ) : null}
            {ticketQueue.status === 'take medicine' && (
              <InputUi
                name="apoteker"
                type={'text'}
                placeholder={'Apoteker'}
                label={'Apoteker'}
                defaultValue={ticketQueue?.isHandle?.apoteker !== '' ? ticketQueue?.isHandle?.apoteker : ''}
                className={'border-2 border-blue-300 rounded-md text-blue-900'}
                colorLabel={'blue-900'}
                onChange={(e) => setApoteker(e.target.value)}
                disabled={ticketQueue.status !== 'take medicine' ? true : false}
                required
              />
            )}

            {ticketQueue.status === 'take medicine' && ticketQueue.isHandle.status === false && (
              <div>
                <label className="text-sm font-medium text-blue-900">Hari ini/Besok?</label>
                <Select
                  name="taken"
                  size="sm"
                  placeholder="Ambil hari ini atau besok"
                  className="border-2 border-blue-300 rounded-md text-blue-900 text-sm"
                  required
                >
                  <SelectItem
                    key="today"
                    value="today"
                    className="w-full bg-white gap-0"
                  >
                    Hari ini
                  </SelectItem>
                  <SelectItem
                    key="tomorrow"
                    value="tomorrow"
                    className="w-full bg-white gap-0"
                  >
                    Besok
                  </SelectItem>
                </Select>
              </div>
            )}
            {ticketQueue.status === 'take medicine' && ticketQueue.isHandle.taken === 'tomorrow' && (
              <Button
                className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2 w-full"
                onClick={handleSendWhastappMessage}
                type="submit"
              >
                <p className="bx bxs-whatsapp text-xl" />
                Konfirmasi ke Pasien
              </Button>
            )}
            {ticketQueue.status === 'queue' && (
              <Button className="text-xs flex items-center gap-1 items-center bg-green-500 text-white p-2 rounded-md mt-2 w-full">
                <p className="bx bxs-download text-xl" />
                Download Ticket
              </Button>
            )}

            {ticketQueue.status === 'take medicine' && ticketQueue.isHandle.status && (
              <div className="w-full">
                <Checkbox
                  isSelected={isTaken}
                  onValueChange={setIsTaken}
                  className="w-full text-sm"
                >
                  Obat diambil (Jangan diceklist jika pasien tidak mengambil obat.)
                </Checkbox>
                <Checkbox
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                  className="w-full text-sm"
                >
                  Pastikan semua data dan obat sudah benar.
                </Checkbox>
              </div>
            )}
          </div>

          {ticketQueue.status === 'queue' && ticketQueue.id !== undefined && (
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
              {ticketQueue.id !== undefined ? 'Cancel' : 'Close'}
            </Button>
            {ticketQueue.id !== undefined && (
              <Button
                color="primary"
                type="submit"
                className={`${ticketQueue.status === 'queue' || (ticketQueue.status === 'take medicine' && ticketQueue.isHandle.status) ? (isSelected ? 'bg-[#3b82f6]' : 'bg-[#A0C4FD]') : 'bg-[#3b82f6]'} font-semibold text-white p-2 rounded-md`}
                isDisabled={ticketQueue.status === 'queue' || (ticketQueue.status === 'take medicine' && ticketQueue.isHandle.status) ? !isSelected || isLoading : false}
                onClick={handleUpdateStatusActivities}
              >
                {isLoading ? 'Loading..' : 'Submit'}
              </Button>
            )}
          </div>
        </form>
      </ModalUi>
    </div>
  );
};

export default ModalTicketQueue;
