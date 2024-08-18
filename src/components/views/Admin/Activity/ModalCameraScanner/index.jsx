import { useEffect, useState } from 'react';
import activityService from '@/services/activity';
import ModalUi from '../../Ui/Modal';
import { Scanner } from '@yudiel/react-qr-scanner';

const ModalCameraScanner = ({ onOpenChange, isOpen, setTicketQueue, setCamera }) => {
  const [dataScanner, setDataScanner] = useState([]);
  const userIdByScanner = dataScanner[0]?.rawValue;

  const getDataByScanner = async () => {
    try {
      const result = await activityService.getDetailActivity(userIdByScanner);
      if (result.status === 200) {
        setCamera(false);
        onOpenChange(false);
        setTicketQueue(result.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataByScanner();
  }, [dataScanner]);

  return (
    <div>
      <ModalUi
        title={'Add New Queue'}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        setCloseModal={setCamera}
      >
        <Scanner onScan={(result) => setDataScanner(result)} />
      </ModalUi>
    </div>
  );
};

export default ModalCameraScanner;
