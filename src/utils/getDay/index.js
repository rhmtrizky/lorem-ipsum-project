const getDay = (dateString) => {
  const date = new Date(dateString);
  const dayNumber = date.getDay();
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return daysOfWeek[dayNumber];
};

export default getDay;
