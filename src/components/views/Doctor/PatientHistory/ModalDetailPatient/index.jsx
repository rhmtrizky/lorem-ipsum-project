import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/views/Admin/Ui/Modal';
import { gender, golDarah } from '@/constraint/adminPanel';
import getDay from '@/utils/getDay';
import { Button, Select, SelectItem, Textarea } from '@nextui-org/react';

const ModalDetailPatient = ({ isOpen, onOpenChange, setOpenModal, openModal, doctorName }) => {
  return (
    <ModalUi
      title={'Detail Pasien'}
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      setCloseModal={setOpenModal}
    >
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="w-fit flex flex-col justify-center items-center text-white font-semibold bg-blue-500 h-[80px] w-[120px] rounded-md ">
          <h1>Ticket Queue</h1>
          <h1 className="text-4xl font-bold">{openModal?.queueNumber}</h1>
        </div>
        <h1 className="font-semibold text-blue-900">Status : {openModal?.status?.charAt(0).toUpperCase() + openModal?.status.slice(1)}</h1>
        <div className="border-2 border-blue-300 rounded-md p-3 w-full text-md text-blue-900 flex flex-col gap-1 mt-2">
          <div className="flex justify-between items-center ">
            <h1 className="font-semibold flex gap-1 justify-center items-center">
              <i className="bx bx-user font-semibold" />
              <p> Doctor</p>
            </h1>
            <p className="text-sm">{doctorName}</p>
          </div>

          <div className="flex justify-between items-center ">
            <h1 className="font-semibold flex gap-1 justify-center items-center">
              <i className="bx bx-time-five"></i>
              <p>Schedule</p>
            </h1>
            <p className="text-sm">
              {openModal?.schedule?.day} - ({openModal?.schedule?.startTime} - {openModal?.schedule?.endTime})
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <h1 className="font-semibold flex gap-1 justify-center items-center">
              <i className="bx bx-time-five"></i>
              <p>Book Date</p>
            </h1>
            <p className="text-sm">
              {getDay(openModal.bookDate)}, {openModal.bookDate}
            </p>
          </div>
        </div>
        <div className="w-full mt-2 flex flex-col gap-3">
          <InputUi
            name="name"
            type={'text'}
            placeholder={'Nama'}
            label={'Nama Pasien'}
            defaultValue={openModal.name}
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
            defaultValue={openModal.nik}
            className={'border-2 border-blue-300 rounded-md text-blue-900'}
            colorLabel={'blue-900'}
            required
            disabled
          />
          <InputUi
            name="bpjsNumber"
            type={'number'}
            placeholder={'No BPJS'}
            label={'No BPJS'}
            defaultValue={openModal.bpjsNumber}
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
            defaultValue={openModal.bornPlace}
            className={'border-2 border-blue-300 rounded-md text-blue-900'}
            colorLabel={'blue-900'}
            required
            disabled
          />
          <InputUi
            name="bornDate"
            type={'date'}
            placeholder={'Tanggal Lahir'}
            label={'Tanggal Lahir'}
            defaultValue={openModal.bornDate}
            className={'border-2 border-blue-300 rounded-md text-blue-900'}
            colorLabel={'blue-900'}
            required
            disabled
          />
          <div>
            <label className="text-sm font-medium text-neutral-800">Jenis Kelamin</label>
            <Select
              name="gender"
              size="sm"
              placeholder="Jenis Kelamin"
              className={'border-2 border-blue-300 rounded-md text-blue-900'}
              defaultSelectedKeys={[openModal.gender]}
              required
              disabled
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
              defaultSelectedKeys={[openModal.golDarah]}
              required
              disabled
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
              defaultValue={openModal.address}
              className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
              disabled
            />
          </div>
          <InputUi
            name="keluhan"
            type={'text'}
            placeholder={'Keluhan'}
            label={'Keluhan'}
            defaultValue={openModal.keluhan}
            className={'border-2 border-blue-300 rounded-md text-blue-900'}
            colorLabel={'blue-900'}
            disabled
            required
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-sm font-medium text-blue-900">Resep Dokter:</label>
          {openModal.resepDokter.map((item, index) => (
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
                    label={'Nama Obat'}
                    value={item.namaObat}
                    defaultValue={item.namaObat}
                    onChange={(e) => handleChangeResepDokter(index, 'namaObat', e.target.value)}
                    required
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
                  />
                </div>
              </div>
              <div className="w-full">
                <InputUi
                  name={`item[${index}].catatan`}
                  type={'text'}
                  placeholder={'Catatan'}
                  label={'Catatan'}
                  value={item.catatan}
                  defaultValue={item.catatan}
                  onChange={(e) => handleChangeResepDokter(index, 'catatan', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm font-medium text-blue-900">Catatan Dokter</label>
          <Textarea
            key={'faded'}
            name="catatanDokter"
            variant={'faded'}
            labelPlacement="outside"
            placeholder="Catatan Dokter"
            defaultValue={openModal.catatanDokter}
            className="col-span-12 md:col-span-6 mb-6 md:mb-0 border-2 border-blue-300 rounded-md text-blue-900"
            required
          />
        </div>

        <div className="w-full flex justify-end items-center my-2">
          <Button
            color="danger"
            variant="light"
            className="w-24 border-[1px] border-neutral-300"
            onClick={() => setOpenModal({})}
          >
            Close
          </Button>
        </div>
      </div>
    </ModalUi>
  );
};

export default ModalDetailPatient;
