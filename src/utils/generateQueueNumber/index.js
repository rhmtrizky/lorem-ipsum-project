const generateQueueNumber = ({ activities, selectedSpesialist, bookDate, doctorId }) => {
  console.log(selectedSpesialist);

  const getSpecialist = activities?.filter((activity) => {
    return activity.specialist === selectedSpesialist && (activity.status !== 'done' || activity.status !== 'expired') && activity.bookDate === bookDate && activity.doctorId === doctorId;
  });

  const queueNumber = (getSpecialist?.length + 1).toString();
  let specialistId = '';
  let doctorCode = '';
  if (selectedSpesialist) {
    specialistId = selectedSpesialist
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
  if (doctorId) {
    doctorCode = doctorId.slice(0, 3).toUpperCase();
  }
  const formattedQueueNumber = queueNumber.padStart(3, '0');
  const formattedResult = `${specialistId}-${formattedQueueNumber}-${doctorCode}`;
  return formattedResult;
};

export default generateQueueNumber;
