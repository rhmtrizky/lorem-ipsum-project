import ModalUi from '@/components/views/Admin/Ui/Modal';
import { Button } from '@nextui-org/react';

const ModalDeleteFamily = ({ deleteFamily, setDeleteFamily, onOpenChange, isOpen, handleRemoveFamily, isLoading }) => {
  return (
    <div>
      <ModalUi
        title={''}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setDeleteFamily}
      >
        <h4>
          Are you sure you want to delete <span className="text-red-500">{`"${deleteFamily?.data?.name}"`}</span>?
        </h4>
        <div className="w-full flex justify-end items-center gap-2 my-2">
          <Button
            color="danger"
            variant="light"
            onClick={() => setDeleteFamily({})}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            className="bg-[#3b82f6] font-semibold text-white p-2 rounded-md"
            onClick={handleRemoveFamily}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </ModalUi>
    </div>
  );
};

export default ModalDeleteFamily;
