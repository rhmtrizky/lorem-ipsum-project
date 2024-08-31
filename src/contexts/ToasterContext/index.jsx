import { createContext, useState } from 'react';

const ToasterContext = createContext({
  toaster: {},
  setToaster: () => {},
});

const ToasterProvider = ({ children }) => {
  const [toaster, setToaster] = useState({});
  console.log(toaster);

  return <ToasterContext.Provider value={{ toaster, setToaster }}>{children}</ToasterContext.Provider>;
};

export { ToasterContext, ToasterProvider };
