const headers = (token) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export default headers;
