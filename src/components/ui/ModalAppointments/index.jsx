import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'

export default function ModalAppointmentsUi({title, children}) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure()


    return (
        <>
        <Button onPress={onOpen} className='hover:text-[654AB4] transition duration-[.3s] ease-linear'  >
            Tambah Anggota Keluarga
        </Button>
        <Modal 
            size='xl'
            backdrop="blur" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            radius="lg"
            classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#ffff] bg-[#fff] text-purple-800 rounded-lg",
            closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent className="relative" >
            {(onClose) => (
                <>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody >
                    {children}
                </ModalBody>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
    )
}
