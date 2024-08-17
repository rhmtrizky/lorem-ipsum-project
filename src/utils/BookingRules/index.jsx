import React, { useState } from 'react';

const BookingRules = ({ bookDate, bookDay, getDocter, getSchedule }) => {
  const [resultCompare, setResultCompare] = useState({});

  // Get current date
  const currentDate = new Date();
  const selectedDate = new Date(bookDate);

  // Get current hour
  const currentHour = currentDate.getHours();
  const scheduleHour = parseInt(getSchedule?.endTime?.split(':')[0], 10);

  // Condition to make sure selectedDate is the same as currentDate
  if (selectedDate?.toDateString() === currentDate.toDateString()) {
    if (currentHour >= scheduleHour) {
      setResultCompare({
        status: false,
        message: 'Jam sudah melebihi waktu yang tersedia.',
      });
      return;
    }
  }

  // Set time part to 00:00:00 for both dates to compare only the date portion
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Condition to check if selectedDate is before currentDate
  if (selectedDate < currentDate) {
    setResultCompare({
      status: false,
      message: 'Tanggal yang Anda pilih sudah lewat.',
    });
    return;
  }

  if (bookDay && getDocter?.schedule?.length > 0) {
    const isDayInSchedule = getDocter?.schedule?.some((item) => item.day.includes(bookDay));

    if (isDayInSchedule) {
      if (bookDay !== getSchedule?.day) {
        setResultCompare({
          status: false,
          message: 'Schedule Dokter yang Anda pilih, tidak sesuai dengan hari yang Anda pilih.',
        });
      } else {
        setResultCompare({
          status: true,
          message: 'Jadwal Tersedia.',
        });
      }
    } else {
      setResultCompare({
        status: false,
        message: 'Jadwal Tidak Tersedia.',
      });
    }
  } else {
    setResultCompare({
      status: false,
      message: 'Tidak Tersedia',
    });
  }

  return <div>{Object.keys(resultCompare).length > 0 && <p className={`${resultCompare.status ? 'text-blue-800' : 'text-red-500'} text-sm italic`}>*{resultCompare.message}</p>}</div>;
};

export default BookingRules;
