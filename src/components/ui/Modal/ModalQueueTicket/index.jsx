import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';

export default function ModalQueueTicketUi({ title, children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-max bg-[#654AB4] hover:bg-[#4e3a8b] rounded-full py-3.5 px-5 my-4 text-white text-[12px] rubik"
        style={{ transition: '.3s ease-out' }}
      >
        Ambil Tiket Antrian
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
