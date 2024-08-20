const BookingRules = ({ bookDate, bookDay, getDocter, getSchedule }) => {
  // Get current date
  const currentDate = new Date();
  const selectedDate = new Date(bookDate);

  // Get current hour
  const currentHour = currentDate.getHours();
  const scheduleHour = parseInt(getSchedule?.endTime?.split(':')[0], 10);

  // Condition to make sure selectedDate is the same as currentDate
  if (selectedDate?.toDateString() === currentDate.toDateString()) {
    if (currentHour >= scheduleHour) {
      return {
        status: false,
        message: 'Jam sudah melebihi waktu yang tersedia.',
      };
    }
  }

  // Set time part to 00:00:00 for both dates to compare only the date portion
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Condition to check if selectedDate is before currentDate
  if (selectedDate < currentDate) {
    return {
      status: false,
      message: 'Tanggal yang Anda pilih sudah lewat.',
    };
  }

  if (bookDay && getDocter?.schedule?.length > 0) {
    const isDayInSchedule = getDocter?.schedule?.some((item) => item.day.includes(bookDay));

    if (isDayInSchedule) {
      if (bookDay !== getSchedule?.day) {
        return {
          status: false,
          message: 'Schedule Dokter yang Anda pilih, tidak sesuai dengan hari yang Anda pilih.',
        };
      } else {
        return {
          status: true,
          message: 'Jadwal Tersedia.',
        };
      }
    } else {
      return {
        status: false,
        message: 'Jadwal Tidak Tersedia.',
      };
    }
  } else {
    return {
      status: false,
      message: 'Tidak Tersedia',
    };
  }
};

export default BookingRules;
