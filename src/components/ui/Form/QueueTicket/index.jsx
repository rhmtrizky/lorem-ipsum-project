import Image from 'next/image';
import ModalTicketUi from '../../Modal/ModalTicket';
import { ticketQueue } from '@/assets/images/images';
import { Avatar, Button } from '@nextui-org/react';
import getDay from '@/utils/getDay';
import QRCode from 'react-qr-code';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';

export default function QueueTicket({ isOpen, onOpen, onOpenChange, ticket, data, user }) {
  const contentRef = useRef();

  return (
    <ModalTicketUi
      title="Ticket"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <div
        className="bg-[#654AB4] p-4 rounded-lg"
        ref={contentRef}
      >
        <Image
          src={ticketQueue}
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-xl"
        />
        <div className="px-5 flex flex-col gap-3 bg-white  rounded-xl py-4">
          <div className="flex items-center gap-3">
            <Avatar src={user?.image} />
            <h1 className="font-semibold text-lg">{ticket?.data?.name}</h1>
          </div>
          <div className="grid grid-cols-2 gap-5 px-2">
            <div className="flex flex-col justify-start items-start">
              <h1 className="font-semibold text-md">Doctor</h1>
              <h1 className=" text-md">{data?.fullname}</h1>
            </div>
            <div className="flex flex-col justify-start items-start pl-3">
              <h1 className="font-semibold text-md">Poli Specialist</h1>
              <h1 className=" text-md">{ticket?.data?.specialist?.toUpperCase()}</h1>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h1 className="font-semibold text-md">Book Date</h1>
              <h1 className=" text-md">
                {getDay(ticket?.data?.bookDate)}, {ticket?.data?.bookDate}
              </h1>
            </div>
            <div className="flex flex-col justify-start items-start pl-3">
              <h1 className="font-semibold text-md">Book Time</h1>
              <h1 className=" text-md">
                {ticket?.data?.schedule?.startTime} - {ticket?.data?.schedule?.endTime}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 px-5 bg-white rounded-xl py-4">
          {Object.keys(ticket).length > 0 ? (
            <div className="flex justify-center items-center">
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={ticket?.id}
                viewBox={`0 0 256 256`}
              />
            </div>
          ) : (
            <h1>QRCODE</h1>
          )}

          <div className="flex flex-col justify-center items-start pl-3 gap-2">
            <div>
              <h1 className="font-semibold text-md">Queue Number</h1>
              <h1 className=" text-md">{ticket?.data?.queueNumber}</h1>
            </div>
            <div>
              <h1 className="font-semibold text-md">Location</h1>
              <h1 className=" text-md">RS Harapan Bunda</h1>
            </div>
            <Button
              className="bg-[#654AB4] text-white rounded-full text-xs mt-2"
              size="sm"
              type="submit"
              onClick={() => generatePDF(contentRef, { filename: `${ticket?.data?.name}-${ticket?.data?.queueNumber}.pdf` })}
            >
              Download Ticket
            </Button>
          </div>
        </div>
      </div>
    </ModalTicketUi>
  );
}
