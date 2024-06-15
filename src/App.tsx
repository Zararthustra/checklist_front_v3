import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { Home, NotFound, PrivacyRules } from '@pages/index';
import AppWrapper from '@services/AppWrapper';

const App = () => {
  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      updateServiceWorker();
    },
    onOfflineReady() {
      console.log('Ready to work offline');
    },
    onRegistered() {
      // eslint-disable-next-line prefer-template
      console.log('Service worker Registered');
    },
    onRegisterError(error: any) {
      console.log('Service worker registration error', error);
    }
  });

  return (
    <ConfigProvider
      locale={frFR}
      theme={{
        token: {
          colorPrimary: '#82bd69',
          borderRadius: 0
        }
      }}>
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route element={<AppWrapper />}>
              <Route element={<Home />} path="/" />
            </Route>
            {/* Règles de confidentialités */}
            <Route element={<PrivacyRules />} path="/privacyrules" />
            {/* 404 */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
