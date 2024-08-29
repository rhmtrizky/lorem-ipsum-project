import Toaster from '@/components/ui/Alert';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import { ToasterContext } from '@/contexts/ToasterContext';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const AppShell = ({ children }) => {
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  // header and footer
  const router = useRouter();

  const excludedPathsNavbar = ['/auth', '/admin', '/doctor', '/pharmacy', '/404'];
  const showNavbar = !excludedPathsNavbar.some((path) => router.pathname.startsWith(path));

  const excludedPathsFooter = ['/auth', '/admin', '/doctor', '/pharmacy', '/404', '/patient', '/schedules', '/find-doctor'];
  const showFooter = !excludedPathsFooter.some((path) => router.pathname.startsWith(path));
  return (
    <NextUIProvider>
      {showNavbar && <Header />}
      {children}
      {showFooter && <Footer />}
      {Object.keys(toaster).length > 0 && (
        <Toaster
          variant={toaster.variant}
          message={toaster.message}
          setToaster={setToaster}
        />
      )}
    </NextUIProvider>
  );
};

export default AppShell;
