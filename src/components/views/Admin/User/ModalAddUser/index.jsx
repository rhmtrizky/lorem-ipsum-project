import InputUi from '@/components/ui/Input';
import ModalUi from '@/components/ui/Modal';
import userService from '@/services/user';
import { Button, Select, SelectItem } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const ModalAddUser = ({ onOpenChange, isOpen, setUsers, setAddUser }) => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'patient',
      label: 'Patient',
    },
    {
      value: 'doctor',
      label: 'Doctor',
    },
    {
      value: 'pharmacy',
      label: 'Pharmacy',
    },
  ];

  const handleAddUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const formData = new FormData(form);

    const data = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      password: formData.get('password'),
      phoneNumber: formData.get('phoneNumber'),
      role: formData.get('role'),
    };
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
          action=""
          onSubmit={handleAddUser}
        >
          <InputUi
            name="fullname"
            type={'text'}
            placeholder={'Fullname'}
            required={true}
          />
          <InputUi
            name={'email'}
            type={'email'}
            placeholder={'Email'}
            required={true}
          />
          <InputUi
            name={'password'}
            type={'password'}
            placeholder={'Password'}
            required={true}
          />
          <InputUi
            name={'phoneNumber'}
            type={'number'}
            placeholder={'Phone Number'}
            required={true}
          />
          <Select
            name="role"
            size="sm"
            placeholder="Select role"
            className="w-full text-neutral-500 shadow-md rounded min-h-[40px] bg-white"
            required={true}
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
