const currentDate = () => {
  const curretntDate = new Date();
  const formatDate = `${curretntDate.getFullYear()}-${(curretntDate.getMonth() + 1).toString().padStart(2, '0')}-${curretntDate.getDate().toString().padStart(2, '0')}`;
  return formatDate;
};

export default currentDate;
