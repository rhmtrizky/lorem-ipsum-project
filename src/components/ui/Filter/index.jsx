import React, { useState } from "react";
import ModalFilterUi from "../ModalFilter";
import Dropdown from "../Dropdown";

export default function Filter() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [testingDay, setTestingDay] = useState(false)

    const toggleDropDownPoli = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleDropDownday = () => {
        setTestingDay(!testingDay)
    }

    const specialists = [
        {
            poli: "Mata"
        },
        {
            poli: "Penyakit Dalam"
        },
        {
            poli: "Kandungan"
        }, 
        {
            poli: "Gigi"
        }
    ]
    const sevenDays = [
        {
            date: "Senin"
        },
        {
            date: "Selasa"
        },
        {
            date: "Rabu"
        },
        {
            date: "Kamis"
        },
        {
            date: "Jumat"
        },
        {
            date: "Sabtu"
        },
        {
            date: "Minggu"
        }

    ]

    return (
        <>
            <ModalFilterUi
                title={"Filter"}
            >
                <Dropdown toggleDropDown={toggleDropDownPoli} dropdownOpen={dropdownOpen} title={"Spesialisasi"} specialists={specialists}/>

                <Dropdown toggleDropDown={toggleDropDownday} testingDay={testingDay} title={"Hari"} sevenDays={sevenDays} />
            </ModalFilterUi>
        </>
    );
}
