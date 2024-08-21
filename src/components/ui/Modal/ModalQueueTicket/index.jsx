import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function ModalQueueTicketUi({ title, children, isOpen, onOpen, onOpenChange }) {

  const router = useRouter()
  const isFamily = router.pathname.split("/")

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-max font-semibold bg-[#654AB4] hover:bg-[#4e3a8b] rounded-full py-3.5 px-5 my-4 text-white text-[14px] rubik "
        style={{ transition: '.3s ease-out' }}
      >
        {
          isFamily[3] === 'account'
          ?
          <i class='bx bx-edit-alt text-blue-700 cursor-pointer ' ></i>
          :
          "Ambil Tiket Antrian"
        }
      </Button>
      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        radius="lg"
        classNames={{
          body: 'py-6',
          backdrop: 'bg-[#292f46]/50 backdrop-opacity-40  ',
          base: 'border-[#ffff] bg-[#fff] text-purple-800 rounded-lg  ',
          closeButton: 'hover:bg-white/5 active:bg-white/10',
        }}
      >
        <ModalContent className="relative">
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
