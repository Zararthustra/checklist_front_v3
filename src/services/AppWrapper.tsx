import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { getLS } from './localStorageService';

import AppContext from '@services/AppContext';

const AppWrapper = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    getLS('darkmode') === 'true' ? true : false
  );

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <Outlet />
    </AppContext.Provider>
  );
};

export default AppWrapper;
