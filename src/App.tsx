import frFR from "antd/locale/fr_FR";
import { ConfigProvider, App as AntApp } from "antd";
import { useRegisterSW } from "virtual:pwa-register/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppWrapper from "@services/AppWrapper";
import { Home, NotFound } from "@pages/index";

const App = () => {
  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      updateServiceWorker();
    },
    onOfflineReady() {
      console.log("Ready to work offline");
    },
    onRegistered(r: any) {
      // eslint-disable-next-line prefer-template
      console.log("Service worker Registered");
    },
    onRegisterError(error: any) {
      console.log("Service worker registration error", error);
    },
  });

  return (
    <ConfigProvider
      locale={frFR}
      theme={{
        token: {
          colorPrimary: "#82bd69",
          borderRadius: 0,
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <Routes>
            <Route element={<AppWrapper />}>
              <Route element={<Home />} path="/" />
            </Route>
            {/* 404 */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};

export default App;
