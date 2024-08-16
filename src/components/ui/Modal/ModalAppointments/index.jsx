import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, scrollBehavior } from '@nextui-org/react'
import React from 'react'


export default function ModalAppointmentsUi({title, children}) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure()


    return (
        <>
        <Button onPress={onOpen} className='hover:text-[#654AB4] transition duration-[.3s] ease-linear'  >
            Tambah Anggota Keluarga
        </Button>
        <Modal 
            size='2xl'
            backdrop="blur" 
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior='outside'
            radius="lg"
            classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40  ",
            base: "border-[#ffff] bg-[#fff] text-purple-800 rounded-lg  ",
            closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent className="relative" >
            {(onClose) => (
                <>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                {/* <ModalFooter>
                    <Button type='submit' className='bg-[#654AB4] hover:bg-[#4e3a8b] rounded-lg text-white transition duration-300 ease-linear ' >Simpan</Button>
                </ModalFooter> */}
                </>
            )}
            </ModalContent>
        </Modal>
    </>
    )
}
