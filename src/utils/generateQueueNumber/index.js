const generateQueueNumber = ({ activities, selectedSpesialist, bookDate }) => {
  console.log(selectedSpesialist);

  const getSpecialist = activities?.filter((activity) => {
    return activity.specialist === selectedSpesialist && (activity.status !== 'done' || activity.status !== 'expired') && activity.bookDate === bookDate;
  });

  const queueNumber = (getSpecialist?.length + 1).toString();
  let specialistId = '';
  if (selectedSpesialist) {
    specialistId = selectedSpesialist
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
  const formattedQueueNumber = queueNumber.padStart(3, '0');
  const formattedResult = `${specialistId}${formattedQueueNumber}`;
  return formattedResult;
};

export default generateQueueNumber;
